import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const Main = () => {
    const [data, setData] = useState([]);
    const [template, setTemplate] = useState([]);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [dates, setDates] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [tasksCreated, setTasksCreated] = useState(false); // State to track if tasks are created for the current date

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:9999/schedule");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            const uniqueDates = [...new Set(jsonData.map((task) => task.date))];
            setDates(uniqueDates);
            const filteredData = jsonData.filter(
                (task) => task.date === selectedDate
            );
            setData(filteredData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const fetchTemplate = async () => {
        try {
            const response = await fetch("http://localhost:9999/template");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            setTemplate(jsonData);
        } catch (error) {
            console.error("Error fetching template: ", error);
        }
    };

    const createTasksFromTemplate = async () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const tasksForToday = template.map((task) => ({
            ...task,
            id: task.id.toString(),
            date: currentDate,
            completed: false,
        }));

        try {
            for (let task of tasksForToday) {
                await fetch("http://localhost:9999/schedule", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(task),
                });
            }
            setTasksCreated(true); // Mark tasks as created for today
            fetchData(); // Refresh data after creating tasks
        } catch (error) {
            console.error("Error creating tasks from template: ", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const isTaskDisabled = (endTime) => {
        const taskEndTime = new Date(currentTime);
        const [hours, minutes] = endTime.split(":");
        taskEndTime.setHours(hours, minutes, 0, 0);
        return taskEndTime < currentTime;
    };

    useEffect(() => {
        fetchTemplate();
        fetchData();
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const currentDate = new Date().toISOString().slice(0, 10);

                // Check if there are tasks for today in the schedule
                const response = await fetch(
                    `http://localhost:9999/schedule?date=${currentDate}`
                );
                if (response.ok) {
                    const jsonData = await response.json();

                    if (jsonData.length > 0) {
                        // Tasks for today already exist, mark as created
                        setTasksCreated(true);
                        fetchData(); // Fetch data for the selected date
                    } else {
                        // No tasks for today, create tasks from template
                        createTasksFromTemplate();
                    }
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error checking tasks for today: ", error);
            }
        };

        fetchInitialData();

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTaskComplete = async (taskId) => {
        try {
            const taskToUpdate = data.find((task) => task.id === taskId);
            if (!taskToUpdate) {
                throw new Error("Task not found");
            }

            const updatedTask = {
                ...taskToUpdate,
                completed: !taskToUpdate.completed,
            };

            const response = await fetch(
                `http://localhost:9999/schedule/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTask),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const updatedTaskFromServer = await response.json();

            setData((prevData) =>
                prevData.map((task) =>
                    task.id === updatedTaskFromServer.id
                        ? updatedTaskFromServer
                        : task
                )
            );
        } catch (error) {
            console.error("Error updating task completion: ", error);
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Daily Task Manager</Typography>
                </Toolbar>
            </AppBar>
            <Box m={2}>
                <FormControl fullWidth>
                    <InputLabel id="date-select-label">Select Date</InputLabel>
                    <Select
                        labelId="date-select-label"
                        value={selectedDate}
                        label="Select Date"
                        onChange={handleDateChange}
                    >
                        {dates.map((date) => (
                            <MenuItem key={date} value={date}>
                                {date}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>Activity</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Completed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    {row.start} - {row.end}
                                </TableCell>
                                <TableCell>{row.activity}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={row.completed}
                                        onChange={() =>
                                            handleTaskComplete(row.id)
                                        }
                                        disabled={isTaskDisabled(row.end)} // Disable checkbox if task end time is in the past
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Main;

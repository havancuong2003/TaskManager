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
import { v4 as uuidv4 } from "uuid";
import UpdateTemplateModal from "./UpdateTemplateModal ";
import { Button } from "react-bootstrap";

const Main = () => {
    const [data, setData] = useState([]);
    const [template, setTemplate] = useState([]);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [dates, setDates] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [tasksCreated, setTasksCreated] = useState(false); // State to track if tasks are created for the current date
    const [userID, setUserID] = useState("user1");
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:9999/schedule?userId=${userID}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();

            const uniqueDates = [...new Set(jsonData.map((task) => task.date))];
            const currentDate = new Date().toISOString().slice(0, 10);

            // Thêm ngày hiện tại vào mảng uniqueDates nếu chưa có
            if (!uniqueDates.includes(currentDate)) {
                uniqueDates.push(currentDate);
            }

            setDates(uniqueDates);

            const filteredData = jsonData.filter(
                (task) => task.date === selectedDate
            );

            // Sắp xếp filteredData theo thời gian (start)
            filteredData.sort((a, b) => {
                const timeA = new Date(`1970/01/01 ${a.start}`);
                const timeB = new Date(`1970/01/01 ${b.start}`);
                return timeA - timeB;
            });

            setData(filteredData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const fetchTemplate = async () => {
        try {
            const response = await fetch(
                `http://localhost:9999/template?userId=${userID}`
            );
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
            id: uuidv4(),
            date: currentDate,
            completed: false,
            userId: userID,
        }));

        try {
            for (let task of tasksForToday) {
                await fetch(`http://localhost:9999/schedule`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(task),
                });
            }
            setTasksCreated(true); // Đánh dấu các hoạt động đã được tạo cho ngày hôm nay
            fetchData(); // Làm mới dữ liệu sau khi tạo các hoạt động
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

    const isTaskDisabled = (taskDate, endTime) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const currentTime = new Date();

        const taskEndDateTime = new Date(`${taskDate}T${endTime}`);

        // Compare both date and time
        return taskEndDateTime <= currentTime && taskDate <= currentDate;
    };

    useEffect(() => {
        fetchTemplate();
        fetchData();
    }, [userID]);

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

                    // Lọc theo userID
                    const userTasks = jsonData.filter(
                        (task) => task.userId === userID
                    );

                    if (userTasks.length > 0) {
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
    }, [selectedDate, userID]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTaskComplete = async (taskId, taskDate) => {
        try {
            const taskToUpdate = data.find(
                (task) => task.id === taskId && task.date === taskDate
            );
            if (!taskToUpdate) {
                throw new Error("Task not found");
            }

            const updatedTask = {
                ...taskToUpdate,
                completed: !taskToUpdate.completed,
            };

            const response = await fetch(
                `http://localhost:9999/schedule/${taskId}?date=${taskDate}`,
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
                    task.id === updatedTaskFromServer.id &&
                    task.date === updatedTaskFromServer.date
                        ? updatedTaskFromServer
                        : task
                )
            );
        } catch (error) {
            console.error("Error updating task completion: ", error);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar className="d-flex justify-between">
                    <Typography variant="h6">Daily Task Manager</Typography>
                    <Button
                        color="white"
                        variant="primary"
                        onClick={handleOpenModal}
                    >
                        Update Template
                    </Button>
                </Toolbar>
            </AppBar>
            <Box m={2}>
                <FormControl fullWidth>
                    <InputLabel id="date-select-label">Select Date</InputLabel>
                    <Select
                        labelId="date-select-label"
                        value={selectedDate}
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
                                            handleTaskComplete(row.id, row.date)
                                        }
                                        disabled={isTaskDisabled(
                                            row.date,
                                            row.end
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <UpdateTemplateModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    templateData={template}
                    updateTemplate={fetchTemplate} // Pass function to update template data after saving changes
                    userID={userID}
                />
            </TableContainer>
        </div>
    );
};

export default Main;

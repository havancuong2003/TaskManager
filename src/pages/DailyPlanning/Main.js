import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    InputBase,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Modal,
    TextField,
    Button,
    FormGroup,
    Checkbox,
} from "@mui/material";
import { AddCircle, Search } from "@mui/icons-material";
import { checkTimeConflict } from "../../utils/timeUtil";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newTask, setNewTask] = useState({
        timeStart: "",
        timeEnd: "",
        activity: "",
        location: "",
        description: "",
    });
    const [sortConfig, setSortConfig] = useState({
        key: "start",
        direction: "asc",
    });
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:9999/schedule");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            const currentDate = new Date().toISOString().slice(0, 10);
            const filteredData = jsonData.filter(
                (task) => task.date === currentDate
            );
            sortData(filteredData, sortConfig);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const sortData = (data, config) => {
        const sortedData = data.sort((a, b) => {
            if (a[config.key] < b[config.key]) {
                return config.direction === "asc" ? -1 : 1;
            }
            if (a[config.key] > b[config.key]) {
                return config.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
    };

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        sortData(data, { key, direction });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 60000); // Cập nhật dữ liệu mỗi 1 phút

        fetchData(); // Fetch lần đầu khi component được mount

        return () => {
            clearInterval(interval); // Dừng interval khi component unmount
        };
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleAddTask = async () => {
        try {
            const startDateTime = new Date(
                `${newTask.date}T${newTask.timeStart}:00`
            );
            if (startDateTime < new Date()) {
                alert("Không thể thêm công việc trong quá khứ.");
                return;
            }

            const endDateTime = new Date(
                `${newTask.date}T${newTask.timeEnd}:00`
            );
            if (endDateTime < new Date()) {
                alert("Không thể thêm công việc trong quá khứ.");
                return;
            }

            const hasConflict = checkTimeConflict(
                {
                    ...newTask,
                    start: newTask.timeStart,
                    end: newTask.timeEnd,
                },
                data
            );

            if (hasConflict) {
                alert("Thời gian bị trùng lặp với công việc khác.");
            } else {
                const currentDate = new Date().toISOString().slice(0, 10);
                const newTaskWithId = {
                    id: uuidv4(),
                    date: currentDate,
                    start: newTask.timeStart,
                    end: newTask.timeEnd,
                    activity: newTask.activity,
                    location: newTask.location,
                    description: newTask.description,
                    completed: false,
                };

                const response = await fetch("http://localhost:9999/schedule", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTaskWithId),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const addedTask = await response.json();

                setData((prevData) => [...prevData, addedTask]);
                sortData([...data, addedTask], sortConfig);

                handleCloseModal();
            }
        } catch (error) {
            console.error("Error adding new task: ", error);
        }
    };

    const handleDeleteTask = async (id, disabled) => {
        if (disabled) {
            alert("Không thể xóa công việc đã qua thời gian.");
            return;
        }

        if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
            try {
                const response = await fetch(
                    `http://localhost:9999/schedule/${id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                setData((prevData) =>
                    prevData.filter((task) => task.id !== id)
                );
            } catch (error) {
                console.error("Error deleting task: ", error);
            }
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter(
        (task) =>
            task.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isTaskDisabled = (task) => {
        const now = new Date();
        const [hours, minutes] = task.end.split(":");
        const taskEndTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes
        );

        return taskEndTime < now;
    };

    const handleEditTask = (task) => {
        setNewTask({ ...task });
        setOpenModal(true);
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
                <Paper component="form">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <InputBase
                        placeholder="Search tasks..."
                        onChange={handleSearch}
                    />
                </Paper>
            </Box>
            <Box m={2}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircle />}
                    onClick={handleOpenModal}
                >
                    Add Task
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={() => handleSort("start")}
                                style={{ cursor: "pointer" }}
                            >
                                Time
                            </TableCell>
                            <TableCell>Activity</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    {row.start} - {row.end}
                                </TableCell>
                                <TableCell>{row.activity}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        disabled={isTaskDisabled(row)}
                                        checked={row.completed}
                                        onChange={() =>
                                            handleTaskComplete(row.id)
                                        }
                                    />
                                    <Button
                                        color="primary"
                                        style={{ marginLeft: 8 }}
                                        onClick={() => handleEditTask(row)} // Pass task object to handleEditTask
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={() =>
                                            handleDeleteTask(
                                                row.id,
                                                isTaskDisabled(row)
                                            )
                                        }
                                    >
                                        <i className="bi bi-trash3-fill"></i>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Add New Task
                    </Typography>
                    <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        name="date"
                        value={newTask.date}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        type="time"
                        label="Start Time"
                        name="timeStart"
                        value={newTask.timeStart}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        type="time"
                        label="End Time"
                        name="timeEnd"
                        value={newTask.timeEnd}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Activity"
                        name="activity"
                        value={newTask.activity}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={newTask.location}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={newTask.description}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTask}
                        >
                            Add
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCloseModal}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default Main;

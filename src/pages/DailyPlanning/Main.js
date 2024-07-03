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
            sortData(jsonData, sortConfig);
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
        fetchData();
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
                const newTaskWithId = {
                    id: uuidv4(),
                    start: newTask.timeStart,
                    end: newTask.timeEnd,
                    activity: newTask.activity,
                    location: newTask.location,
                    description: newTask.description,
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
                sortData([...data, addedTask], sortConfig); // Sort data after adding new task

                handleCloseModal();
            }
        } catch (error) {
            console.error("Error adding new task: ", error);
        }
    };

    const handleDeleteTask = async (id) => {
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

    return (
        <div>
            <AppBar position="static">
                <Toolbar className="flex justify-between">
                    <div className="flex items-center">
                        <Typography variant="h6" noWrap>
                            Lịch Trình Hàng Ngày ( cần làm thêm theo dõi hàng
                            ngày xem có thực hiện đủ hay không)
                        </Typography>
                        <IconButton color="inherit" onClick={handleOpenModal}>
                            <AddCircle />
                        </IconButton>
                    </div>
                    <div className="relative mr-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            className="pl-10 pr-4 py-2 rounded-full bg-gray-100"
                            inputProps={{ "aria-label": "search" }}
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Box m={2}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => handleSort("start")}
                                    >
                                        Thời Gian
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => handleSort("activity")}
                                    >
                                        Hoạt Động
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => handleSort("location")}
                                    >
                                        Địa Điểm
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleSort("description")
                                        }
                                    >
                                        Mô Tả
                                    </span>
                                </TableCell>
                                <TableCell>Thao Tác</TableCell>
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
                                        <Button
                                            color="primary"
                                            style={{ marginRight: 10 }}
                                        >
                                            <i
                                                className="bi bi-pencil-square"
                                                title="Edit"
                                            ></i>
                                        </Button>
                                        <Button
                                            color="secondary"
                                            onClick={() =>
                                                handleDeleteTask(row.id)
                                            }
                                        >
                                            <i
                                                className="bi bi-trash3"
                                                title="Delete"
                                            ></i>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
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
                    <Typography variant="h6" component="h2">
                        Thêm Công Việc Mới
                    </Typography>
                    <FormGroup>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Thời Gian Bắt Đầu"
                            name="timeStart"
                            type="time"
                            value={newTask.timeStart}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Thời Gian Kết Thúc"
                            name="timeEnd"
                            type="time"
                            value={newTask.timeEnd}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Hoạt Động"
                            name="activity"
                            value={newTask.activity}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Địa Điểm"
                            name="location"
                            value={newTask.location}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Mô Tả"
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleAddTask}
                        >
                            Thêm
                        </Button>
                    </FormGroup>
                </Box>
            </Modal>
        </div>
    );
};

export default Main;

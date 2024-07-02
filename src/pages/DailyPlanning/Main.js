import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
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
    FormControl,
    FormLabel,
    FormGroup,
} from "@mui/material";
import {
    CalendarToday,
    GridOn,
    AddCircle,
    Settings,
    Description,
    FilterList,
    List,
    Chat,
    SwapHoriz,
    ArrowBack,
    Search,
    ArrowDownward,
    ArrowUpward,
} from "@mui/icons-material";
import { checkTimeConflict } from "../../utils/timeUtil"; // Import hàm kiểm tra thời gian trùng lặp
import { v4 as uuidv4 } from "uuid";

const Main = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newTask, setNewTask] = useState({
        timeStart: "",
        timeEnd: "",
        activity: "",
        location: "",
        description: "",
        person: "",
    });

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:9999/schedule");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
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
    console.log("task", newTask);

    const handleAddTask = async () => {
        try {
            const timeStart = new Date(`1970-01-01T${newTask.timeStart}:00`);
            const timeEnd = new Date(`1970-01-01T${newTask.timeEnd}:00`);

            console.log("timeStart", timeStart);
            console.log("timeEnd", timeEnd);

            // Check if newTask conflicts with existing tasks
            const hasConflict = checkTimeConflict(
                {
                    ...newTask,
                    timeStart: newTask.timeStart,
                    timeEnd: newTask.timeEnd,
                },
                data
            );

            if (hasConflict) {
                alert("Thời gian bị trùng lặp với công việc khác.");
            } else {
                const newTaskWithId = {
                    ...newTask,
                    id: uuidv4(),
                    start: newTask.timeStart,
                    end: newTask.timeEnd,
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

                // Add new task to data
                setData((prevData) => [...prevData, addedTask]);
                handleCloseModal();
            }
        } catch (error) {
            console.error("Error adding new task: ", error);
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar className="flex justify-between">
                    <div className="flex items-center">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <CalendarToday />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Lịch Trình Hàng Ngày
                        </Typography>
                        <IconButton color="inherit" onClick={handleMenu}>
                            <GridOn />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Grid</MenuItem>
                            <MenuItem onClick={handleClose}>
                                Another action
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                Something else
                            </MenuItem>
                        </Menu>
                        <IconButton color="inherit" onClick={handleOpenModal}>
                            <AddCircle />
                        </IconButton>
                        <IconButton color="inherit">
                            <Settings />
                        </IconButton>
                        <IconButton color="inherit">
                            <Description />
                        </IconButton>
                        <IconButton color="inherit">
                            <FilterList />
                        </IconButton>
                        <IconButton color="inherit">
                            <List />
                        </IconButton>
                        <IconButton color="inherit">
                            <ArrowDownward />
                            <ArrowUpward />
                        </IconButton>
                        <IconButton color="inherit">
                            <Chat />
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
                        />
                    </div>
                    <div className="flex items-center">
                        <IconButton color="inherit">
                            <SwapHoriz />
                        </IconButton>
                        <IconButton color="inherit">
                            <ArrowBack />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Box m={2}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Thời Gian</TableCell>
                                <TableCell>Hoạt Động</TableCell>
                                <TableCell>Địa Điểm</TableCell>
                                <TableCell>Mô Tả</TableCell>
                                <TableCell>Người Tham Gia</TableCell>
                                <TableCell>Thao Tác</TableCell>
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
                                    <TableCell>{row.person}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            // onClick={() => handleEdit(row.id)}
                                            style={{ marginRight: 10 }}
                                        >
                                            <i
                                                className="bi bi-pencil-square"
                                                title="Edit"
                                            ></i>
                                        </Button>
                                        <Button
                                            color="secondary"
                                            // onClick={() => handleDelete(row.id)}
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

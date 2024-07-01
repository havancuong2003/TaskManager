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
import { Button } from "react-bootstrap";

const Main = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

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
                        <IconButton color="inherit">
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
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{row.activity}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.person}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            //   onClick={() => handleEdit(row.id)}
                                            style={{ marginRight: 10 }}
                                        >
                                            <i
                                                class="bi bi-pencil-square"
                                                title="Edit"
                                            ></i>
                                        </Button>
                                        <Button
                                            color="secondary"
                                            //   onClick={() => handleDelete(row.id)}
                                        >
                                            <i
                                                class="bi bi-trash3"
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
        </div>
    );
};

export default Main;

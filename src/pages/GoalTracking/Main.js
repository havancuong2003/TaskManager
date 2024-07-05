import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Dropdown,
    DropdownButton,
    Row,
    Col,
} from "react-bootstrap";

const Main = () => {
    const [schedules, setSchedules] = useState([]);

    const handleDelete = (id) => {
        setSchedules(schedules.filter((item) => item.id !== id));
    };

    useEffect(() => {
        fetch("http://localhost:9999/schedule")
            .then((res) => res.json())
            .then((result) => setSchedules(result))
            .catch((err) => console.log(err));
    }, []);

    const parseTime = (time) => {
        // Parse time in "HH:mm" format to minutes since start of the day
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const sortedSchedules = schedules.sort((a, b) => {
        const timeA = parseTime(a.timeStart || a.start);
        const timeB = parseTime(b.timeStart || b.start);
        return timeA - timeB;
    });

    return (
        <div>
            <Row>
                <Col md={12}>
                    <h2>My GoalTracking</h2>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Start</th>
                                <th>End </th>
                                <th>Activity </th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>Progress</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedSchedules.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.timeStart || s.start}</td>
                                    <td>{s.timeEnd || s.end}</td>
                                    <td>{s.activity}</td>
                                    <td>{s.location}</td>
                                    <td>{s.description}</td>
                                    <td>
                                        <DropdownButton
                                            id="dropdow-basic-button"
                                            title="Progress"
                                        >
                                            <Dropdown.Item>
                                                Completed
                                            </Dropdown.Item>
                                            <Dropdown.Item>Doing</Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                    <td>
                                        <DropdownButton
                                            id="dropdown-basic-button"
                                            title="Actions"
                                        >
                                            <Dropdown.Item
                                                onClick={() =>
                                                    handleDelete(s.id)
                                                }
                                            >
                                                Delete
                                            </Dropdown.Item>
                                            <Dropdown.Item>Edit</Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Button variant="primary">Add New</Button>
                </Col>
            </Row>
        </div>
    );
};

export default Main;

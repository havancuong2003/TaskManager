import React, { useEffect, useState } from "react";
import { Container, Table, Collapse } from "react-bootstrap";
import "./UncompletedTasks.css";

const UncompletedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [openTaskId, setOpenTaskId] = useState(null);
    const id = localStorage.getItem("id");
    // const [id, setId] = useState("user1");
    useEffect(() => {
        // Fetch data from the API endpoint
        fetch("http://localhost:9999/schedule")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);

                // Get current date and time
                const now = new Date();
                const yyyy = now.getFullYear();
                const mm = String(now.getMonth() + 1).padStart(2, "0");
                const dd = String(now.getDate()).padStart(2, "0");
                const hh = String(now.getHours()).padStart(2, "0");
                const min = String(now.getMinutes()).padStart(2, "0");
                const currentDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}`;

                // Filter tasks to find uncompleted ones that are before or at the current date and time
                const uncompletedTasks = data.filter((task) => {
                    const taskDateTime = `${task.date}T${task.start}`;
                    const isUncompleted = !task.completed;
                    const isUser = task.userId == id;
                    return (
                        isUncompleted &&
                        taskDateTime <= currentDateTime &&
                        isUser
                    );
                });

                // Sort tasks by date and time descending and take the 4 most recent
                uncompletedTasks.sort(
                    (a, b) =>
                        new Date(b.date + "T" + b.start) -
                        new Date(a.date + "T" + a.start)
                );
                const recentTasks = uncompletedTasks.slice(0, 4);

                setTasks(recentTasks);
            })
            .catch((error) => {
                console.error("Error fetching the data", error);
            });
    }, []);

    return (
        <Container fluid className="tasks-container">
            <Table
                striped
                bordered
                hover
                responsive="md"
                className="tasks-table"
            >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <React.Fragment key={task.id}>
                            <tr
                                className="task-row"
                                onClick={() =>
                                    setOpenTaskId(
                                        openTaskId === task.id ? null : task.id
                                    )
                                }
                            >
                                <td>{task.date}</td>
                                <td>{task.activity}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <Collapse in={openTaskId === task.id}>
                                        <div className="task-details">
                                            <p>
                                                <strong>Start:</strong>{" "}
                                                {task.start}
                                            </p>
                                            <p>
                                                <strong>End:</strong> {task.end}
                                            </p>
                                            <p>
                                                <strong>Location:</strong>{" "}
                                                {task.location}
                                            </p>
                                        </div>
                                    </Collapse>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UncompletedTasks;

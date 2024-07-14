import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
    Row,
    Col,
    Form,
    Container,
    Modal,
    DropdownButton,
    Dropdown,
} from "react-bootstrap";

const Main = () => {
    const [goals, setGoals] = useState([]);
    const userID = localStorage.getItem("id");
    const [id, setId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null);
    const [newGoal, setNewGoal] = useState({
        userID: id,
        startdate: "",
        enddate: "",
        activity: "",
        description: "",
        progress: false,
    });

    useEffect(() => {
        fetch("http://localhost:9999/GoalTracking")
            .then((res) => res.json())
            .then((result) => {
                const userGoals = result.filter((goal) => goal.userID === id);
                setGoals(userGoals);
            })
            .catch((err) => console.error("Failed to fetch goals:", err));
        setId(userID);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGoal({
            ...newGoal,
            [name]: value,
        });
    };

    const handleProgressChange = (goal, progress) => {
        const updatedGoal = { ...goal, progress: progress === "Completed" };
        fetch(`http://localhost:9999/GoalTracking/${goal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedGoal),
        })
            .then((res) => res.json())
            .then((result) => {
                setGoals(goals.map((g) => (g.id === goal.id ? result : g)));
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            fetch(`http://localhost:9999/GoalTracking/${currentGoal.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGoal),
            })
                .then((res) => res.json())
                .then((updatedGoal) => {
                    setGoals(
                        goals.map((goal) =>
                            goal.id === currentGoal.id ? updatedGoal : goal
                        )
                    );
                })
                .catch((err) => console.log(err));
            setIsEditing(false);
            setCurrentGoal(null);
        } else {
            fetch("http://localhost:9999/GoalTracking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGoal),
            })
                .then((res) => res.json())
                .then((addedGoal) => {
                    setGoals([...goals, addedGoal]);
                })
                .catch((err) => console.log(err));
        }
        setShowModal(false);
        setNewGoal({
            userID: id,
            startdate: "",
            enddate: "",
            activity: "",
            description: "",
            progress: false,
        });
    };

    const handleEdit = (goal) => {
        setCurrentGoal(goal);
        setNewGoal(goal);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:9999/GoalTracking/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    setGoals(goals.filter((goal) => goal.id !== id));
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h1>Goal Tracking</h1>
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                    >
                        Add
                    </Button>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Activity</th>
                                <th>Goal</th>
                                <th>Progress</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {goals.map((g) => (
                                <tr key={g.id}>
                                    <td>{g.startdate}</td>
                                    <td>{g.enddate}</td>
                                    <td>{g.activity}</td>
                                    <td>{g.description}</td>
                                    <td>
                                        <DropdownButton
                                            id="dropdown-basic-button"
                                            title={
                                                g.progress
                                                    ? "Completed"
                                                    : "InProgress"
                                            }
                                            variant={
                                                g.progress
                                                    ? "success"
                                                    : "warning"
                                            } // Change color based on progress
                                            onSelect={(eventKey) =>
                                                handleProgressChange(
                                                    g,
                                                    eventKey
                                                )
                                            }
                                        >
                                            <Dropdown.Item eventKey="Completed">
                                                Completed
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="InProgress">
                                                InProgress
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                    <td>
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleEdit(g)}
                                            className="mr-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(g.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEditing ? "Edit Goal" : "Add New Goal"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="startdate"
                                value={newGoal.startdate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="enddate"
                                value={newGoal.enddate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Activity</Form.Label>
                            <Form.Control
                                type="text"
                                name="activity"
                                value={newGoal.activity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Goal</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newGoal.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={
                                    newGoal.progress
                                        ? "Completed"
                                        : "InProgress"
                                }
                                variant={
                                    newGoal.progress ? "success" : "warning"
                                } // Change color based on progress
                                onSelect={(eventKey) =>
                                    setNewGoal({
                                        ...newGoal,
                                        progress: eventKey === "Completed",
                                    })
                                }
                            >
                                <Dropdown.Item eventKey="Completed">
                                    Completed
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="InProgress">
                                    InProgress
                                </Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            {isEditing ? "Update Goal" : "Add Goal"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Main;

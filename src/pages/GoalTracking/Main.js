import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
    Row,
    Col,
    Form,
    Container,
    Modal,
} from "react-bootstrap";

const Main = () => {
    const [goals, setGoals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null);
    const [newGoal, setNewGoal] = useState({
        startdate: "",
        enddate: "",
        activity: "",
        description: "",
        progress: "",
    });

    useEffect(() => {
        fetch("http://localhost:9999/GoalTracking")
            .then((res) => res.json())
            .then((result) => setGoals(result))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGoal({
            ...newGoal,
            [name]: value,
        });
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
            startdate: "",
            enddate: "",
            activity: "",
            description: "",
            progress: "",
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
                                <th>Description</th>
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
                                    <td>{g.progress}</td>
                                    <td>
                                        <Button
                                            variant="warning"
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newGoal.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Progress</Form.Label>
                            <Form.Control
                                type="text"
                                name="progress"
                                value={newGoal.progress}
                                onChange={handleChange}
                                required
                            />
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

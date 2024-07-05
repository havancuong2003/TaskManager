import React from "react";
import { Container, Row } from "react-bootstrap";
import "./taskManagment.css";
import Main from "./Main";
import TaskList from "./TaskList";
const TaskManagment = () => {
    return (
        <Container fluid>
            <Row>
                <TaskList />
            </Row>
        </Container>
    );
};

export default TaskManagment;

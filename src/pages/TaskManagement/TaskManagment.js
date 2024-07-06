import React from "react";
import { Container, Row } from "react-bootstrap";
import "./taskManagment.css";
import Main from "./Main";
const TaskManagment = () => {
    return (
        <Container fluid>
            <Row>
                <Main />
            </Row>
        </Container>
    );
};

export default TaskManagment;

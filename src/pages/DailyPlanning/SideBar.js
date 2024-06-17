import React from "react";
import { Container, Form, Row, InputGroup, Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi"; // Import icon từ thư viện react-icons

const SideBar = () => {
    return (
        <Container>
            <Row>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Container fluid>
                            <Row>
                                <Col md={10}>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <BiSearch />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="search"
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={2}>
                                    <i className="bi bi-chevron-double-left"></i>
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    );
};

export default SideBar;

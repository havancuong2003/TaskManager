import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./Login.css"; // Create this file for custom styles
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
    return (
        <section className="ftco-section">
            <Container>
                <Row className="justify-content-center">
                    <Col md={7} lg={5}>
                        <Card className="wrap">
                            <Card.Img
                                variant="top"
                                src="./images/bg-1.jpg"
                                className="img"
                            />
                            <Card.Body className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Sign In</h3>
                                    </div>
                                    <div className="w-100">
                                        <p className="social-media d-flex justify-content-end">
                                            <a
                                                href="#"
                                                className="social-icon d-flex align-items-center justify-content-center"
                                            >
                                                <i class="bi bi-facebook"></i>
                                            </a>
                                            <a
                                                href="#"
                                                className="social-icon d-flex align-items-center justify-content-center"
                                            >
                                                <i class="bi bi-twitter"></i>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <Form action="oke" className="signin-form">
                                    <Form.Group className="form-group mt-3">
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="Username"
                                        />
                                        <Form.Label className="form-control-placeholder">
                                            Username
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Control
                                            type="password"
                                            required
                                            placeholder="Password"
                                            id="password-field"
                                        />
                                        <Form.Label className="form-control-placeholder">
                                            Password
                                        </Form.Label>
                                        <span
                                            toggle="#password-field"
                                            className="fa fa-fw fa-eye field-icon toggle-password"
                                        ></span>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Button
                                            type="submit"
                                            className="form-control btn btn-primary rounded submit px-3"
                                        >
                                            Sign In
                                        </Button>
                                    </Form.Group>
                                    <Form.Group className="d-md-flex">
                                        <div className="w-50 text-left">
                                            <Form.Check
                                                type="checkbox"
                                                label="Remember Me"
                                                defaultChecked
                                            />
                                        </div>
                                    </Form.Group>
                                </Form>
                                <p
                                    className="text-center"
                                    style={{ marginTop: "30px" }}
                                >
                                    Not a member?{" "}
                                    <a
                                        href="#signup2"
                                        data-toggle="tab"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Sign Up
                                    </a>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

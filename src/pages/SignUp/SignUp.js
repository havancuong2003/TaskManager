import React, { useState } from "react";
import { Form, Container, Button, Row, Col, InputGroup } from "react-bootstrap";

import "./SignUp.css";
function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit the form data to the server
        console.log("Form submitted:", {
            name,
            email,
            password,
            confirmPassword,
            agreeTerms,
        });
    };

    return (
        <Container fluid style={{ marginTop: "100px" }}>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <h2 className="mb-4">Sign up</h2>
                        <Form.Group controlId="formName">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i class="bi bi-person"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i class="bi bi-symmetry-horizontal"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i class="bi bi-symmetry-horizontal"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    placeholder="Repeat your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formAgree">
                            <Form.Check
                                type="checkbox"
                                label="I agree all statements in Terms of service"
                                checked={agreeTerms}
                                onChange={(e) =>
                                    setAgreeTerms(e.target.checked)
                                }
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            REGISTER
                        </Button>
                    </Col>
                    <Col xs={12} md={6}>
                        {/* Illustration of a person opening a door */}
                        <img
                            src="./images/bg-1.jpg"
                            style={{ width: "100%", height: "100%" }}
                            alt="Sign up illustration"
                        />
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default SignUpForm;

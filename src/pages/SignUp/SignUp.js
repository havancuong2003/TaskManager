import React, { useState, useEffect } from "react";
import {
    Form,
    Container,
    Button,
    Row,
    Col,
    InputGroup,
    Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUpForm() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [username, setUsername] = useState("");
    const [maxProductId, setMaxProductId] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://localhost:9999/accounts`)
            .then((res) => res.json())
            .then((result) => {
                const maxProductId2 = result.length
                    ? Math.max(...result.map((p) => p.id))
                    : null;
                setMaxProductId(maxProductId2);
            })
            .catch((error) => console.log(error));
    }, []);

    function handleCreate(e) {
        e.preventDefault();

        // Validation checks
        if (username === "" || password === "") {
            setError("Username and password cannot be empty.");
            return;
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            setError("Username must be alphanumeric.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain uppercase, lowercase, number, and special character."
            );
            return;
        }

        const newAccount = {
            id: String(maxProductId + 1),
            username: username,
            password: password,
        };

        fetch(`http://localhost:9999/accounts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        })
            .then((result) => {
                if (result.ok) {
                    console.log("Account created successfully");
                    alert("Account created successfully");
                    setError("");

                    navigate("/login");
                } else {
                    return result.json().then((data) => {
                        throw new Error(
                            data.message || "Failed to create account"
                        );
                    });
                }
            })
            .then((result) => console.log(result))
            .catch((error) => {
                setError(error.message);
                console.log(error);
            });
    }

    return (
        <Container fluid style={{ marginTop: "100px" }}>
            <Form onSubmit={handleCreate}>
                <Row>
                    <Col xs={12} md={6}>
                        <h2 className="mb-4">Sign up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="formName">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-person"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Your Name"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-symmetry-horizontal"></i>
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
                                    <i className="bi bi-symmetry-horizontal"></i>
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
                        <Form.Group className="mb-3">
                            <Button type="submit">Register</Button>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
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

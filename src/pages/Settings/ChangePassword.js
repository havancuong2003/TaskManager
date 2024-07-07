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
import { useNavigate, useParams, Link } from "react-router-dom";

function ChangePassWord() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordraw, setPasswordraw] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://localhost:9999/accounts/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setPasswordraw(result.password);
                setUsername(result.username);
            })
            .catch((error) => console.log(error));
    }, [id]);

    function handleCreate(e) {
        e.preventDefault();

        // Validation checks
        if (password === "" || confirmPassword === "") {
            setError("Current and confirm password cannot be empty.");
            return;
        }
        if (passwordraw !== password) {
            setError("Current password does not match.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Confirm passwords do not match.");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (
            !passwordRegex.test(confirmPassword) ||
            !passwordRegex.test(newPassword)
        ) {
            setError(
                "Password must contain uppercase, lowercase, number, and special character."
            );
            return;
        }

        const newAccount = {
            id: String(id),
            username: username,
            password: newPassword,
        };

        fetch(`http://localhost:9999/accounts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        })
            .then((result) => {
                if (result.ok) {
                    alert("Password changed successfully!");
                    navigate("/settings");
                } else {
                    return result.json().then((data) => {
                        throw new Error(
                            data.message || "Failed to change password"
                        );
                    });
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <Container fluid className="change-password-container">
            <Col>
                <Button
                    style={{ backgroundColor: "skyblue", marginBottom: 10 }}
                >
                    {" "}
                    <Link
                        to={"/settings"}
                        style={{
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        Back
                    </Link>
                </Button>
            </Col>
            <Form onSubmit={handleCreate} className="change-password-form">
                <h2 className="mb-4" style={{ textAlign: "center" }}>
                    Change Password
                </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formPassword">
                    <InputGroup
                        className="mb-3 mx-auto"
                        style={{ width: "50%" }}
                    >
                        <InputGroup.Text>
                            <i className="bi bi-lock-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Current Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formNewPassword">
                    <InputGroup
                        className="mb-3 mx-auto"
                        style={{ width: "50%" }}
                    >
                        <InputGroup.Text>
                            <i className="bi bi-lock-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <InputGroup
                        className="mb-3 mx-auto"
                        style={{ width: "50%" }}
                    >
                        <InputGroup.Text>
                            <i className="bi bi-lock-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button
                        type="submit"
                        variant="primary"
                        style={{ width: "150px" }}
                    >
                        Change Password
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default ChangePassWord;

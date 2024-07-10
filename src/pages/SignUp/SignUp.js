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
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function SignUpForm() {
    const { t } = useTranslation("translation");
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
            setError(t("isempty"));
            return;
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            setError(t("alphanumeric"));
            return;
        }

        if (password !== confirmPassword) {
            setError(t("notmatch"));
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(t("contains"));
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
                    console.log(t("createaccountsuccess"));
                    alert(t("createaccountsuccess"));
                    setError("");

                    navigate("/login");
                } else {
                    return result.json().then((data) => {
                        throw new Error(
                            data.message || t("createaccountfailed")
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
        <Container>
            <Form onSubmit={handleCreate}>
                <Button style={{ marginBottom: "40px", marginTop: "40px" }}>
                    <Link
                        to="/login"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Back to Login
                    </Link>
                </Button>
                <Row>
                    <Col xs={12} md={6}>
                        <h2 className="mb-4">{t("signup")}</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="formName">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-person"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder={t("username")}
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
                                    placeholder={t("password")}
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
                                    placeholder={t("confirmpassword")}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            style={{ marginTop: "20px" }}
                        >
                            <Button type="submit">{t("signup")}</Button>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <img
                            src="./images/bg-1.jpg"
                            alt="Sign up illustration"
                        />
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default SignUpForm;

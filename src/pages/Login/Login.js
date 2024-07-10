import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./Login.css"; // Create this file for custom styles
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
function changeLanguage(language) {
    i18n.changeLanguage(language);
    localStorage.setItem("language", JSON.stringify(language));
}
export default function Login() {
    const { t } = useTranslation("translation");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    const handleCheckUserAndPassword = () => {
        fetch("http://localhost:9999/accounts")
            .then((response) => response.json())
            .then((data) => {
                const user = data.find(
                    (user) =>
                        user.username === username && user.password === password
                );
                if (user) {
                    localStorage.setItem("id", user.id);
                    setTimeout(() => {
                        localStorage.removeItem("id");
                    }, 60000);

                    navigate("/dashboard/" + user.id);
                } else {
                    alert("Login failed");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
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
                                        <h3 className="mb-4">{t("signin")}</h3>
                                    </div>
                                    <div className="w-100">
                                        <p className="social-media d-flex justify-content-end">
                                            <a
                                                href="#"
                                                className="social-icon d-flex align-items-center justify-content-center"
                                            >
                                                <i className="bi bi-facebook"></i>
                                            </a>
                                            <a
                                                href="#"
                                                className="social-icon d-flex align-items-center justify-content-center"
                                            >
                                                <i className="bi bi-twitter"></i>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <Form action="oke" className="signin-form">
                                    <Form.Group className="form-group mt-3">
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder={t("username")}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                        <Form.Label className="form-control-placeholder">
                                            {t("username")}
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Control
                                            type="password"
                                            required
                                            placeholder={t("password")}
                                            id="password-field"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <Form.Label className="form-control-placeholder">
                                            {t("password")}
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
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleCheckUserAndPassword();
                                            }}
                                        >
                                            {t("login")}
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
                                    {t("notamember")}{" "}
                                    <a
                                        href="#signup2"
                                        data-toggle="tab"
                                        style={{ textDecoration: "none" }}
                                        onClick={handleSignUpClick}
                                    >
                                        {t("signup")}
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

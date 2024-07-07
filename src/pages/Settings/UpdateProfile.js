import React from "react";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [job, setJob] = useState("");
    useEffect(() => {
        fetch(`http://localhost:9999/profile/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setUsername(result.name);
                setEmail(result.email);
                setPhone(result.phone);
                setAddress(result.address);
                setJob(result.job);
            })
            .catch((error) => console.log(error));
    }, [id]);

    function handleUpdate(e) {
        e.preventDefault();
        const updateProduct = {
            id: id,
            name: username,
            email: email,
            phone: phone,
            address: address,
            job: job,
        };
        fetch(`http://localhost:9999/profile/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProduct),
        })
            .then((result) => {
                if (result.ok) {
                    navigate("/settings");
                } else {
                    return result.json().then((data) => {
                        throw new Error(
                            data.message || "Failed to update profile"
                        );
                    });
                }
            })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    }

    return (
        <Container>
            <Col>
                <h3 style={{ textAlign: "center" }}>Edit Profile</h3>
            </Col>
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
            <Col>
                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>ID</Form.Label>
                        <Form.Control disabled value={id} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>User name (*)</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Job</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button type="submit">Update</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Container>
    );
}

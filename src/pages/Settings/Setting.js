import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Image,
    ListGroup,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const id = sessionStorage.getItem("id");
    const [showUpload, setShowUpload] = useState(false);
    const [uploadedImage, setUploadedImage] = useState("");
    const [src, setSrc] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    useEffect(() => {
        axios
            .get("http://localhost:9999/image")
            .then((response) => {
                setSrc(response.data[0].src);
            })
            .catch((error) => console.log(error));

        fetch("http://localhost:9999/profile/1").then((response) => {
            response.json().then((data) => {
                setUsername(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
            });
        });
    }, []);

    function UploadImage() {
        const [image, setImage] = useState("");

        function handleImage(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result);
                    setUploadedImage(reader.result);

                    axios
                        .patch("http://localhost:9999/image/1", {
                            src: reader.result,
                        })
                        .then((response) => {
                            console.log(
                                "Image uploaded and src updated:",
                                response.data
                            );
                        })
                        .catch((error) => {
                            console.error(
                                "There was an error updating the image!",
                                error
                            );
                        });
                };
                reader.readAsDataURL(file);
            }
        }

        return (
            <div>
                <input type="file" name="file" onChange={handleImage} />
                {image && (
                    <img
                        src={image}
                        alt="Selected"
                        style={{ width: "100px", height: "100px" }}
                    />
                )}
                <Button onClick={() => setShowUpload(false)}>Close</Button>
            </div>
        );
    }

    return (
        <section style={{ backgroundColor: "#eee" }}>
            <Container className="py-5">
                <Row>
                    <Col lg="4">
                        <Card className="mb-4">
                            <Card.Body className="text-center">
                                <Image
                                    src={
                                        uploadedImage ||
                                        src ||
                                        "../images/pizaa.jpg"
                                    }
                                    alt="avatar"
                                    roundedCircle
                                    style={{ width: "150px" }}
                                    fluid
                                />
                                <p className="text-muted mb-1">Dev</p>
                                <p className="text-muted mb-4">Nghệ An</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button
                                        variant="primary"
                                        onClick={() => setShowUpload(true)}
                                    >
                                        Update Image
                                    </Button>
                                    <Button
                                        variant="outline-primary"
                                        className="ms-1"
                                    >
                                        Change Image
                                    </Button>
                                </div>
                                {showUpload && <UploadImage />}
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 mb-lg-0">
                            <Card.Body className="p-0">
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-person-lines-fill"></i>
                                        <Card.Text>
                                            <Link
                                                to={`/profile/changepassword/${id}`}
                                            >
                                                Change Password
                                            </Link>
                                        </Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-translate"></i>
                                        <Card.Text>Language</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-bell"></i>
                                        <Card.Text>Notifications</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-instagram"></i>
                                        <Card.Text>
                                            <Link
                                                to={"/profile/updateprofile/"}
                                            >
                                                Update Profile
                                            </Link>
                                        </Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-boxes"></i>
                                        <Card.Text>User Interface</Card.Text>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card className="mb-4">
                            <Card.Body>
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Full Name</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {username}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Email</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {email}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Phone</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {phone}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Mobile</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {phone}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>Address</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {address}
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

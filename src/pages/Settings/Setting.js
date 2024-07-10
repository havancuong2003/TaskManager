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
    Dropdown,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { isAuthenticated } from "../Login/Authenticated";

// Function to change language
function changeLanguage(language) {
    i18n.changeLanguage(language);
    localStorage.setItem("language", JSON.stringify(language));
}

export default function ProfilePage() {
    const id = localStorage.getItem("id");
    isAuthenticated();
    const [showUpload, setShowUpload] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(
        localStorage.getItem("uploadedImage" + id) || ""
    );
    const [src, setSrc] = useState("");
    const [profile, setProfile] = useState({});
    const { t } = useTranslation("translation"); // Translation function

    useEffect(() => {
        // Fetch profile data based on id
        axios
            .get(`http://localhost:9999/profile/${id}`)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => console.error("Error fetching profile:", error));

        // Fetch image data
        axios
            .get("http://localhost:9999/image")
            .then((response) => {
                const imageData = response.data.find(
                    (image) => image.id === id
                );
                if (imageData) {
                    setSrc(imageData.src);
                }
            })
            .catch((error) => console.log("Error fetching image:", error));
    }, [id]);

    function UploadImage() {
        const [image, setImage] = useState("");

        function handleImage(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result);
                    setUploadedImage(reader.result);

                    // Check if image for current id exists
                    const existingImage = src;

                    // If image exists, update; otherwise, add new image
                    if (existingImage) {
                        // Update existing image
                        axios
                            .patch(`http://localhost:9999/image/${id}`, {
                                src: reader.result,
                            })
                            .then((response) => {
                                console.log("Image updated:", response.data);
                                setSrc(reader.result);
                                localStorage.setItem(
                                    "uploadedImage" + id,
                                    reader.result
                                );
                            })
                            .catch((error) => {
                                console.error("Error updating image:", error);
                            });
                    } else {
                        // Add new image
                        axios
                            .post(`http://localhost:9999/image`, {
                                id: id,
                                src: reader.result,
                                uploadedAt: new Date().toISOString(),
                            })
                            .then((response) => {
                                console.log("Image added:", response.data);
                                setSrc(reader.result);
                                localStorage.setItem(
                                    "uploadedImage" + id,
                                    reader.result
                                );
                            })
                            .catch((error) => {
                                console.error("Error adding image:", error);
                            });
                    }
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
                                        "../images/imageDefault.png"
                                    }
                                    alt="avatar"
                                    className="rounded-circle mb-3"
                                    style={{
                                        width: "150px",
                                        marginLeft: "100px",
                                    }}
                                    fluid
                                />
                                <p className="text-muted mb-1">{profile.job}</p>
                                <p className="text-muted mb-4">
                                    {profile.address}
                                </p>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button
                                        variant="primary"
                                        onClick={() => setShowUpload(true)}
                                    >
                                        {t("updateimage")}
                                    </Button>
                                </div>
                                {showUpload && <UploadImage />}
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 mb-lg-0">
                            <Card.Body className="p-0">
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-lock"></i>
                                        <Card.Text>
                                            <Link
                                                to={`/profile/changepassword/${id}`}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "blue",
                                                }}
                                            >
                                                {t("changpassword")}
                                            </Link>
                                        </Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-person-vcard"></i>
                                        <Card.Text>
                                            <Link
                                                to={`/profile/updateprofile/${id}`}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "blue",
                                                }}
                                            >
                                                {t("updateprofile")}
                                            </Link>
                                        </Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-translate"></i>
                                        <Card.Text>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="success"
                                                    id="dropdown-basic"
                                                >
                                                    {t("language")}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            changeLanguage(
                                                                "eng"
                                                            )
                                                        }
                                                    >
                                                        English
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            changeLanguage(
                                                                "vie"
                                                            )
                                                        }
                                                    >
                                                        Tiếng Việt
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="bi bi-bell"></i>
                                        <Card.Text>Notifications</Card.Text>
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
                                        <Card.Text>{t("fullname")}</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {profile.name}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>{t("email")}</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {profile.email}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>{t("phone")}</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {profile.phone}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>{t("mobile")}</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {profile.phone}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text>{t("address")}</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {profile.address}
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

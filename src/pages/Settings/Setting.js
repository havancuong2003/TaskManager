import React from "react";
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

export default function ProfilePage() {
    return (
        <section style={{ backgroundColor: "#eee" }}>
            <Container className="py-5">
                <Row>
                    <Col lg="4">
                        <Card className="mb-4">
                            <Card.Body className="text-center">
                                <Image
                                    src="../images/pizaa.jpg"
                                    alt="avatar"
                                    roundedCircle
                                    style={{ width: "150px" }}
                                    fluid
                                />
                                <p className="text-muted mb-1">Dev</p>
                                <p className="text-muted mb-4">Nghệ An</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button>Update Image</Button>
                                    <Button
                                        variant="outline-primary"
                                        className="ms-1"
                                    >
                                        Change Image
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 mb-lg-0">
                            <Card.Body className="p-0">
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i class="bi bi-person-lines-fill"></i>
                                        <Card.Text>Change Password</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i class="bi bi-translate"></i>
                                        <Card.Text>Language</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i class="bi bi-bell"></i>
                                        <Card.Text>Notifications</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i class="bi bi-instagram"></i>
                                        <Card.Text>Function</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i class="bi bi-boxes"></i>
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
                                            Đậu Đình Hiếu
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
                                            hieudau@fe.edu.vn
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
                                            (097) 234-5678
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
                                            (098) 765-4321
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
                                            Nghệ An
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

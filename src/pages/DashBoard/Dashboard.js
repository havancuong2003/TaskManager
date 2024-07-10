import React from "react";
import ChartistGraph from "react-chartist";
import "chartist/dist/chartist.min.css";
import { Bar } from "react-chartjs-2";

// react-bootstrap components
import {
    Button,
    Card,
    Table,
    Container,
    Row,
    Col,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import ActivityChart from "./ActivityChart";
import PieChart from "./PieChart";
import ComparisonChart from "./ComparisonChart";
import UncompletedTasks from "./UncompletedTasks";

function Dashboard() {
    const pieChartData = [20, 30, 10, 25, 5, 10];
    const pieChartLabels = [
        "Sleep",
        "Work",
        "Exercise",
        "Leisure",
        "Eating",
        "Other",
    ];
    const activityData = [
        5, 3, 4, 2, 6, 7, 8, 5, 6, 4, 3, 2, 7, 6, 5, 8, 4, 6, 7, 5, 4, 3, 2, 1,
    ];

    return (
        <>
            <Container fluid>
                <Row style={{ marginTop: "20px" }}>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="bi bi-browser-chrome"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">
                                                Number
                                            </p>
                                            <Card.Title as="h4">
                                                150GB
                                            </Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats">
                                    <i className="fas fa-redo mr-1"></i>
                                    Update Now
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="bi bi-dribbble"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">
                                                Walking Steps
                                            </p>
                                            <Card.Title as="h4">
                                                1,345
                                            </Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats">
                                    <i className="far fa-calendar-alt mr-1"></i>
                                    In the last hour
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="bi bi-clipboard2-x-fill"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">
                                                Task Uncomplete
                                            </p>
                                            <Card.Title as="h4">10</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats">
                                    <i className="far fa-clock-o mr-1"></i>
                                    Last day
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="bi bi-calendar2-week"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">
                                                Hang out
                                            </p>
                                            <Card.Title as="h4">
                                                15:00
                                            </Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats">
                                    <i className="fas fa-redo mr-1"></i>
                                    Update now
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="8" key="barChart">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Users Behavior</Card.Title>
                                <p className="card-category">
                                    24 Hours performance
                                </p>
                            </Card.Header>
                            <Card.Body>
                                <div className="ct-chart" id="chartHours">
                                    <Container>
                                        <ActivityChart
                                            key="barChart" // Đảm bảo key là duy nhất cho BarChart
                                        />
                                    </Container>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <br />
                                <hr></hr>
                                <div className="stats">
                                    <i className="fas fa-history"></i>
                                    Updated 3 minutes ago
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md="4" key="pieChart">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Activity Time</Card.Title>
                                <p className="card-category">
                                    Throughout the day
                                </p>
                            </Card.Header>
                            <Card.Body>
                                <div
                                    className="ct-chart ct-perfect-fourth"
                                    id="chartPreferences"
                                >
                                    <Container>
                                        <PieChart
                                            key="pieChart" // Đảm bảo key là duy nhất cho PieChart
                                        />
                                    </Container>
                                </div>
                                <div className="stats">
                                    <i className="far fa-clock">Yesterday</i>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">
                                    Behavior Comparison
                                </Card.Title>
                                <p className="card-category">All task in day</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="ct-chart" id="chartActivity">
                                    <ComparisonChart />
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <div className="legend">
                                    <i className="fas fa-circle text-info"></i>{" "}
                                    <i className="fas fa-circle text-danger"></i>
                                </div>
                                <hr></hr>
                                <div className="stats">
                                    <i className="fas fa-check"></i>
                                    Data information certified
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card className="card-tasks">
                            <Card.Header>
                                <Card.Title as="h4">
                                    Uncompleted Tasks
                                </Card.Title>
                                <p className="card-category">Last 4 tasks</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-full-width">
                                    <UncompletedTasks />
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats">
                                    <i className="now-ui-icons loader_refresh spin"></i>
                                    Updated 3 minutes ago
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;

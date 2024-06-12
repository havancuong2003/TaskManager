import { Container, Row, Col } from "react-bootstrap";

import "./daily.css"; // import file CSS của bạn
import SideBar from "./SideBar";
import Main from "./Main";

const DailyPlanning = () => {
    return (
        <Container className="App" fluid>
            <Row>
                <Col md={3} className="sidebar">
                    <SideBar />
                </Col>
                <Col
                    md={9}
                    className="main"
                    style={{ borderLeft: "1px solid #ccc" }}
                >
                    <Main />
                </Col>
            </Row>
        </Container>
    );
};

export default DailyPlanning;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./daily.css"; // import file CSS của bạn
import SideBar from "./SideBar";
import Main from "./Main";

const DailyPlanning = () => {
    return (
        <Container className="App" fluid style={{ display: "flex" }}>
            <div style={{ flex: "0 0 15%", maxWidth: "15%" }}>
                <SideBar />
            </div>
            <div
                style={{
                    flex: "0 0 85%",
                    maxWidth: "85%",
                    borderLeft: "1px solid #ccc",
                }}
            >
                <Main />
            </div>
        </Container>
    );
};

export default DailyPlanning;

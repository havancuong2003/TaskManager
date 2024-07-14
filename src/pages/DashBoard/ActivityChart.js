import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import "./ActivityChart.css";
import "./ChartSetup";

const ActivityChart = () => {
    const [activityData, setActivityData] = useState(Array(24).fill(0));
    const id = localStorage.getItem("id");
    // const [id, setId] = useState("user1");
    useEffect(() => {
        // Calculate yesterday's date
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate());
        const yyyy = yesterday.getFullYear();
        const mm = String(yesterday.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const dd = String(yesterday.getDate()).padStart(2, "0");
        const yesterdayDateString = `${yyyy}-${mm}-${dd}`;

        console.log(`Fetching data for date: ${yesterdayDateString}`);

        // Fetch data from the API endpoint
        fetch("http://localhost:9999/schedule")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);

                const schedule = data.filter(
                    (task) => task.date === yesterdayDateString
                );
                console.log("Filtered schedule for yesterday:", schedule);

                const newActivityData = Array(24).fill(0);

                schedule.forEach((task) => {
                    const startHour = parseInt(task.start.split(":")[0], 10);
                    const endHour = parseInt(task.end.split(":")[0], 10);

                    for (let hour = startHour; hour <= endHour; hour++) {
                        newActivityData[hour] += 1;
                    }
                });

                console.log("Processed activity data:", newActivityData);
                setActivityData(newActivityData);
            })
            .catch((error) => {
                console.error("Error fetching the data", error);
            });
    }, []);

    const chartData = {
        labels: [
            "12 AM",
            "1 AM",
            "2 AM",
            "3 AM",
            "4 AM",
            "5 AM",
            "6 AM",
            "7 AM",
            "8 AM",
            "9 AM",
            "10 AM",
            "11 AM",
            "12 PM",
            "1 PM",
            "2 PM",
            "3 PM",
            "4 PM",
            "5 PM",
            "6 PM",
            "7 PM",
            "8 PM",
            "9 PM",
            "10 PM",
            "11 PM",
        ],
        datasets: [
            {
                label: "Activity Level",
                data: activityData,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1, // Ensure y-axis increments in whole numbers
                },
            },
        },
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="chart-container">
                        <Bar data={chartData} options={options} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ActivityChart;

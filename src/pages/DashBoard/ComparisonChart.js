import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
// import "./ComparisonChart.css";
import "./ChartSetup"; // Import ChartSetup to configure Chart.js

const ComparisonChart = () => {
    const [activityData, setActivityData] = useState({
        day1: Array(24).fill(0),
        day2: Array(24).fill(0),
    });
    const id = localStorage.getItem("id");
    // const [id, setId] = useState("user1");
    useEffect(() => {
        // Calculate the dates for the two days
        const today = new Date();
        const yesterday = new Date(today);
        const dayBeforeYesterday = new Date(today);
        yesterday.setDate(yesterday.getDate());
        dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 1);

        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const ddYesterday = String(yesterday.getDate()).padStart(2, "0");
        const ddDayBeforeYesterday = String(
            dayBeforeYesterday.getDate()
        ).padStart(2, "0");

        const yesterdayDateString = `${yyyy}-${mm}-${ddYesterday}`;
        const dayBeforeYesterdayDateString = `${yyyy}-${mm}-${ddDayBeforeYesterday}`;

        console.log(
            `Fetching data for ${dayBeforeYesterdayDateString} and ${yesterdayDateString}`
        );

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

                // Filter data for each day
                const scheduleDay1 = data.filter(
                    (task) =>
                        task.date === dayBeforeYesterdayDateString &&
                        task.userId == id
                );
                const scheduleDay2 = data.filter(
                    (task) =>
                        task.date === yesterdayDateString && task.userId == id
                );
                console.log(
                    "Filtered schedule for day before yesterday:",
                    scheduleDay1
                );
                console.log("Filtered schedule for yesterday:", scheduleDay2);

                // Process data for each day
                const newActivityDataDay1 = Array(24).fill(0);
                const newActivityDataDay2 = Array(24).fill(0);

                scheduleDay1.forEach((task) => {
                    const startHour = parseInt(task.start.split(":")[0], 10);
                    const endHour = parseInt(task.end.split(":")[0], 10);

                    for (let hour = startHour; hour <= endHour; hour++) {
                        newActivityDataDay1[hour] += 1;
                    }
                });

                scheduleDay2.forEach((task) => {
                    const startHour = parseInt(task.start.split(":")[0], 10);
                    const endHour = parseInt(task.end.split(":")[0], 10);

                    for (let hour = startHour; hour <= endHour; hour++) {
                        newActivityDataDay2[hour] += 1;
                    }
                });

                console.log(
                    "Processed activity data for day before yesterday:",
                    newActivityDataDay1
                );
                console.log(
                    "Processed activity data for yesterday:",
                    newActivityDataDay2
                );

                setActivityData({
                    day1: newActivityDataDay1,
                    day2: newActivityDataDay2,
                });
            })
            .catch((error) => {
                console.error("Error fetching the data", error);
            });
    }, []);

    // Prepare data for the bar chart
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
                label: "Activity Level - Yesterday",
                data: activityData.day1,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                stack: "day",
            },
            {
                label: "Activity Level - Today",
                data: activityData.day2,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                stack: "day",
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                beginAtZero: true,
                stacked: true,
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
                        {activityData.day1.length === 0 ||
                        activityData.day2.length === 0 ? (
                            <p>Loading...</p>
                        ) : (
                            <Bar data={chartData} options={options} />
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ComparisonChart;

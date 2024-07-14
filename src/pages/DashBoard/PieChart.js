import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Container } from "react-bootstrap";
import "./PieChart.css";
import "./ChartSetup"; // Import ChartSetup

const PieChart = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const id = localStorage.getItem("id");
    // const [id, setId] = useState("user1");
    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            const response = await fetch("http://localhost:9999/schedule");
            const json = await response.json();
            console.log("Fetched data:", json);

            // Process data
            const activityCategories = {
                Sleep: 0,
                Work: 0,
                Exercise: 0,
                Leisure: 0,
                Eating: 0,
                Other: 0,
            };

            json.forEach((item) => {
                const start = new Date(`1970-01-01T${item.start}:00Z`);
                const end = new Date(`1970-01-01T${item.end}:00Z`);
                const duration = (end - start) / 1000 / 60; // duration in minutes

                if (item.activity.includes("Ngủ") && item.userId == id) {
                    activityCategories.Sleep += duration;
                } else if (
                    (item.activity.includes("Công Việc") ||
                        item.activity.includes("Email")) &&
                    item.userId == id
                ) {
                    activityCategories.Work += duration;
                } else if (
                    (item.activity.includes("Tập Thể Dục") ||
                        item.activity.includes("Chạy")) &&
                    item.userId == id
                ) {
                    activityCategories.Exercise += duration;
                } else if (
                    (item.activity.includes("Giải Lao") ||
                        item.activity.includes("Leisure")) &&
                    item.userId == id
                ) {
                    activityCategories.Leisure += duration;
                } else if (item.activity.includes("Ăn") && item.userId == id) {
                    activityCategories.Eating += duration;
                } else if (item.userId == id) {
                    activityCategories.Other += duration;
                }
            });

            setData(Object.values(activityCategories));
            setLabels(Object.keys(activityCategories));
        };

        fetchData();
    }, []);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "% of Activity",
                data: data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${labels[tooltipItem.dataIndex]}: ${
                            data[tooltipItem.dataIndex]
                        } phút`;
                    },
                },
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default PieChart;

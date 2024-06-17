import React from "react";
import { Pie } from "react-chartjs-2";
import { Container } from "react-bootstrap";
import "./PieChart.css";
const PieChart = ({ data, labels }) => {
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
                        return `${labels[tooltipItem.index]}: ${
                            data[tooltipItem.index]
                        }%`;
                    },
                },
            },
        },
    };

    return (
        <Container>
            <Pie data={chartData} options={options} />
        </Container>
    );
};

export default PieChart;
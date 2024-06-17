// LineChart.js
import React from "react";
import ChartistGraph from "react-chartist";
import "chartist/dist/chartist.min.css";

const LineChart = () => {
    const data = {
        labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM",
        ],
        series: [
            [287, 385, 490, 492, 554, 586, 698, 695],
            [67, 152, 143, 240, 287, 335, 435, 437],
            [23, 113, 67, 108, 190, 239, 307, 308],
        ],
    };

    const options = {
        low: 0,
        high: 800,
        showArea: false,
        height: "245px",
        axisX: {
            showGrid: false,
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: true,
        chartPadding: {
            right: 50,
        },
    };

    const responsiveOptions = [
        [
            "screen and (max-width: 640px)",
            {
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    },
                },
            },
        ],
    ];

    return (
        <div>
            <ChartistGraph
                data={data}
                options={options}
                responsiveOptions={responsiveOptions}
                type="Line"
            />
        </div>
    );
};

export default LineChart;

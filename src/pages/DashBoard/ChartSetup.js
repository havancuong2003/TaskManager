// ChartSetup.js

import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

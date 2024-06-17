import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/DashBoard/Dashboard";
import routes from "./routes.js";
import "./assets/css/assignmentbody.css";
import Footer from "./components/Footer/Footer.js";
import GoalTracking from "./pages/GoalTracking/GoalTracking";
import TaskManagment from "./pages/TaskManagement/TaskManagment";

import DailyPlanning from "./pages/DailyPlanning/DailyPlanning";
import LineChart from "./pages/ChartistGraph.js";
import ActivityChart from "./pages/DashBoard/ActivityChart.js";

function App() {
    const [color, setColor] = React.useState("black");

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} routes={routes} />
                <div className="main-panel">
                    <Header />
                    <Dashboard />
                    <Footer />
                </div>
            </div>
            <LineChart />
        </>
    );
}

export default App;

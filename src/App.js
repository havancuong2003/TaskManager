import React from "react";

import "./assets/css/assignmentbody.css";
import Layout from "./layout/Layout";
import Dashboard from "./pages/DashBoard/Dashboard";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import GoalTracking from "./pages/GoalTracking/GoalTracking";
import TaskManagment from "./pages/TaskManagement/TaskManagment";
import DailyPlanning from "./pages/DailyPlanning/DailyPlanning";
import Login from "./pages/Login/Login.js";
import SignUpForm from "./pages/SignUp/SignUp.js";
// import { Login } from "@mui/icons-material";
import Setting from "./pages/Settings/Setting";
// import SignUp from "./pages/SignUp/SignUp";
import "./pages/DailyPlanning/daily.css";
import LineChart from "./pages/ChartistGraph.js";
import ActivityChart from "./pages/DashBoard/ActivityChart.js";
import UpdateProfile from "./pages/Settings/UpdateProfile.js";
import ChangePassWord from "./pages/Settings/ChangePassword.js";

function App() {
    const [color, setColor] = React.useState("black");
    const { pId } = useParams();
    return (
        <>
            {" "}
            <BrowserRouter basename="/">
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <Layout>
                                <Dashboard />
                            </Layout>
                        }
                    />
                    <Route
                        path="/dashboard/:id"
                        exact
                        element={
                            <Layout>
                                <Dashboard />
                            </Layout>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <Layout>
                                <Dashboard />
                            </Layout>
                        }
                    />
                    <Route
                        path="/dailyplanning"
                        exact
                        element={
                            <Layout>
                                <DailyPlanning />
                            </Layout>
                        }
                    />
                    <Route
                        path="/goaltracking"
                        exact
                        element={
                            <Layout>
                                <GoalTracking />
                            </Layout>
                        }
                    />
                    <Route path="/login" exact element={<Login />} />
                    <Route
                        path="/settings"
                        exact
                        element={
                            <Layout>
                                <Setting />
                            </Layout>
                        }
                    />
                    <Route path="/signup" exact element={<SignUpForm />} />
                    <Route
                        path="/taskmanagement"
                        exact
                        element={
                            <Layout>
                                <TaskManagment />
                            </Layout>
                        }
                    />
                    <Route
                        path="/profile/changepassword/:id"
                        exact
                        element={<ChangePassWord />}
                    />
                    <Route
                        path="/profile/updateprofile/:id"
                        exact
                        element={<UpdateProfile />}
                    />
                    <Route
                        path="/dashboard/:id"
                        exact
                        element={<Dashboard />}
                    />
                </Routes>
            </BrowserRouter>{" "}
            {/* <DailyPlanning /> */}
        </>
    );
}

export default App;

import React from "react";

import "./assets/css/assignmentbody.css";
import Layout from "./layout/Layout";
import Dashboard from "./pages/DashBoard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GoalTracking from "./pages/GoalTracking/GoalTracking";
import TaskManagment from "./pages/TaskManagement/TaskManagment";
import DailyPlanning from "./pages/DailyPlanning/DailyPlanning";
import Login from "./pages/Login/Login.js";
import SignUpForm from "./pages/SignUp/SignUp.js";
import { Login } from "@mui/icons-material";
import Setting from "./pages/Settings/Setting";
import SignUp from "./pages/SignUp/SignUp";
import "./pages/DailyPlanning/daily.css";

function App() {
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
                    <Route path="/signup" exact element={<SignUp />} />
                    <Route
                        path="/taskmanagement"
                        exact
                        element={
                            <Layout>
                                <TaskManagment />
                            </Layout>
                        }
                    />
                </Routes>
            </BrowserRouter>{" "}
            {/* <DailyPlanning /> */}
        </>
    );
}

export default App;

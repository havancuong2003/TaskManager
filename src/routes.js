// import Dashboard from "views/Dashboard.js";
// import UserProfile from "views/UserProfile.js";
// import TableList from "views/TableList.js";
// import Typography from "views/Typography.js";
// import Icons from "views/Icons.js";
// import Maps from "views/Maps.js";
// import Notifications from "views/Notifications.js";
// import Upgrade from "views/Upgrade.js";

import DailyPlanning from "./pages/DailyPlanning/DailyPlanning.js";
import DashBoard from "./pages/DashBoard/Dashboard.js";
import GoalTracking from "./pages/GoalTracking/GoalTracking.js";
import Login from "./pages/Login/Login.js";
import Settings from "./pages/Settings/Setting.js";
import SignUp from "./pages/SignUp/SignUp.js";
import TaskManagment from "./pages/TaskManagement/TaskManagment.js";

const dashboardRoutes = [
    {
        upgrade: true,
        path: "/dailyplanning",
        name: "Daily Planning",
        icon: "nc-icon nc-alien-33",
        component: DailyPlanning,
        layout: "/admin",
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-chart-pie-35",
        component: DashBoard,
        layout: "/admin",
    },
    {
        path: "/goaltracking",
        name: "Goal Tracking",
        icon: "nc-icon nc-circle-09",
        component: GoalTracking,
        layout: "/admin",
    },
    {
        path: "/login",
        name: "Login",
        icon: "nc-icon nc-notes",
        component: Login,
        layout: "/admin",
    },
    {
        path: "/settings",
        name: "Settings",
        icon: "nc-icon nc-paper-2",
        component: Settings,
        layout: "/admin",
    },
    {
        path: "/signup",
        name: "Sign Up",
        icon: "nc-icon nc-atom",
        component: SignUp,
        layout: "/admin",
    },
    {
        path: "/taskmanagement",
        name: "Task Management",
        icon: "nc-icon nc-pin-3",
        component: TaskManagment,
        layout: "/admin",
    },
];

export default dashboardRoutes;

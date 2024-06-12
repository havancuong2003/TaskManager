import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/DashBoard/Dashboard";
import routes from "./routes.js";
import "./assets/css/assignmentbody.css";
import Footer from "./components/Footer/Footer.js";
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
                    {/* <div className="content">
                        <Switch>{getRoutes(routes)}</Switch>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default App;

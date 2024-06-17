import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import routes from "../routes";

const Layout = ({ children }) => {
    const [color, setColor] = React.useState("black");
    return (
        <div className="wrapper">
            <Sidebar color={color} routes={routes} />
            <div className="main-panel">
                <Header />
                <div className="content">{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;

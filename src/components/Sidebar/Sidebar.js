import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
function Sidebar({ color, image, routes }) {
    const { t } = useTranslation("translation");
    const navigate = useNavigate();

    return (
        <div className="sidebar" data-image={image} data-color={color}>
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: "url(" + image + ")",
                }}
            />
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <a
                        href="https://www.google.com"
                        className="simple-text logo-mini mx-1"
                    >
                        <div className="logo-img">
                            <img src={logo} alt="..." />
                        </div>
                    </a>
                    <a className="simple-text" href="http://www.google.com">
                        {t("taskmanager")}
                    </a>
                </div>
                <Nav className="flex-column">
                    {routes.map((prop, key) => {
                        if (!prop.redirect) {
                            return (
                                <Nav.Item key={key} className="nav-item">
                                    <Nav.Link
                                        onClick={() => navigate(prop.path)}
                                    >
                                        {/* <i className={prop.icon} /> */}
                                        <p>{t(prop.name)}</p>
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        }
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;

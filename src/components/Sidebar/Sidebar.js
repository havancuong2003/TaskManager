import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Sidebar({ color, image, routes }) {
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
                        href="https://www.creative-tim.com?ref=lbd-sidebar"
                        className="simple-text logo-mini mx-1"
                    >
                        <div className="logo-img">
                            <img src="" alt="..." />
                        </div>
                    </a>
                    <a
                        className="simple-text"
                        href="http://www.creative-tim.com"
                    >
                        Creative Tim
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
                                        <i className={prop.icon} />
                                        <p>{prop.name}</p>
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

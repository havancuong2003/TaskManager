import React from "react";
import {
    Navbar,
    Nav,
    Container,
    Button,
    Form,
    FormControl,
    Dropdown,
    DropdownButton,
    DropdownItem,
} from "react-bootstrap";
import {
    BsSearch,
    BsPlusCircle,
    BsThreeDotsVertical,
    BsFileText,
    BsBookHalf,
    BsCalendar2Event,
    BsBarChartLine,
} from "react-icons/bs";

const Sidebar = () => {
    return (
        <Navbar bg="light" variant="light" expand="false" className="sidebar">
            <Container fluid>
                <Nav className="flex-column">
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={
                            <span>
                                <BsFileText /> Daily Work <BsPlusCircle />
                            </span>
                        }
                    >
                        <Dropdown.Item href="#/action-1">
                            <span>
                                <BsFileText /> My Notes
                            </span>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            <span>
                                <BsBookHalf /> Reading Progress
                            </span>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            <span>
                                <BsBarChartLine /> Gantt view 1
                            </span>
                        </Dropdown.Item>
                    </DropdownButton>

                    <Nav.Link href="#/action-2">
                        <span>
                            <BsPlusCircle /> New Table
                        </span>
                    </Nav.Link>
                    <Nav.Link href="#/action-3">
                        <span>
                            <BsPlusCircle /> New Form
                        </span>
                    </Nav.Link>
                    <Nav.Link href="#/action-4">
                        <span>
                            <BsPlusCircle /> New Dashboard
                        </span>
                    </Nav.Link>
                </Nav>
                <Form className="d-flex ml-auto">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">
                        <BsSearch />
                    </Button>
                </Form>
            </Container>
        </Navbar>
    );
};

export default Sidebar;

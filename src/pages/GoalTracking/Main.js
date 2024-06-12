import { MdDescription } from "react-icons/md";
import React, { useState } from "react";
import {
    Table,
    Row,
    Col,
    Button,
    Form,
    Dropdown,
    DropdownButton,
    ButtonGroup,
    InputGroup,
    FormControl,
    Badge,
} from "react-bootstrap";
import {
    BiPlus,
    BiChevronDown,
    BiChevronRight,
    BiCog,
    BiFilter,
    BiSort,
    BiBarChartAlt2,
    BiGridVertical,
    BiGroup,
    BiAlarm,
    BiFile,
} from "react-icons/bi";

const Main = () => {
    const [records, setRecords] = useState([
        {
            id: 1,
            subject: "Exercise",
            title: "Morning Exercise",
            link: "#",
            startDate: "2024/01/06",
            endDate: "2024/01/06",
            progress: "Completed",
            summary: "Write a summary",
        },
        {
            id: 2,
            subject: "Breakfast",
            title: "Have Breakfast",
            link: "#",
            startDate: "2024/03/01",
            endDate: "2024/03/01",
            progress: "Completed",
            summary: "Write a summary",
        },
        {
            id: 3,
            subject: "Job",
            title: "Work ",
            link: "#",
            startDate: "2024/04/04",
            endDate: "2024/04/25",
            progress: "In progress",
            summary: "Write a summary",
        },
        {
            id: 4,
            subject: "Subject 4",
            title: "Title 4",
            link: "#",
            startDate: "2022/04/20",
            endDate: "2022/05/27",
            progress: "In progress",
            summary: "Write a summary",
        },
        {
            id: 5,
            subject: "Subject 5",
            title: "Title 5",
            link: "#",
            startDate: "2022/05/28",
            endDate: "2022/08/31",
            progress: "In progress",
            summary: "Write a summary",
        },
        {
            id: 6,
            subject: "Subject 6",
            title: "Title 6",
            link: "#",
            startDate: "2021/12/08",
            endDate: "2022/12/12",
            progress: "In progress",
            summary: "Write a summary",
        },
        {
            id: 7,
            subject: "Subject 7",
            title: "Title 7",
            link: "#",
            startDate: "2022/12/07",
            endDate: "2022/12/16",
            progress: "Not started",
            summary: "Write a summary",
        },
        {
            id: 8,
            subject: "Subject 8",
            title: "Title 8",
            link: "#",
            startDate: "2022/12/15",
            endDate: "2022/12/23",
            progress: "Not started",
            summary: "Write a summary",
        },
        {
            id: 9,
            subject: "Subject 9",
            title: "Title 9",
            link: "#",
            startDate: "2022/12/19",
            endDate: "2022/12/31",
            progress: "Not started",
            summary: "Write a summary",
        },
    ]);

    const [showAddRecordModal, setShowAddRecordModal] = useState(false);
    const [showGenerateFormModal, setShowGenerateFormModal] = useState(false);

    const handleAddRecord = () => {
        setShowAddRecordModal(true);
    };

    const handleGenerateForm = () => {
        setShowGenerateFormModal(true);
    };

    const handleCloseModal = () => {
        setShowAddRecordModal(false);
        setShowGenerateFormModal(false);
    };

    return (
        <div className="container-fluid">
            <Row className="mt-3">
                <Col>
                    <div className="d-flex justify-content-start">
                        <ButtonGroup className="me-2">
                            <Button
                                variant="outline-secondary"
                                className="me-1"
                            >
                                <BiChevronDown />
                            </Button>
                            <Button variant="outline-secondary">
                                <BiChevronRight />
                            </Button>
                        </ButtonGroup>
                        <DropdownButton
                            variant="outline-secondary"
                            title="My Notes"
                            className="me-2"
                        >
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                        </DropdownButton>
                        <Button
                            variant="outline-secondary"
                            onClick={handleAddRecord}
                            className="me-2"
                        >
                            <BiPlus />
                            Add Record
                        </Button>
                        <DropdownButton
                            variant="outline-secondary"
                            title="Customize Field"
                            className="me-2"
                        >
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                            variant="outline-secondary"
                            title="View Settings"
                            className="me-2"
                        >
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                            variant="outline-secondary"
                            title="Filter"
                            className="me-2"
                        >
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                            variant="outline-secondary"
                            title="1 Group"
                            className="me-2"
                        >
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                        </DropdownButton>
                        <ButtonGroup className="me-2">
                            <DropdownButton
                                variant="outline-secondary"
                                title="Sort"
                                className="me-1"
                            >
                                <Dropdown.Item>Action</Dropdown.Item>
                                <Dropdown.Item>Another action</Dropdown.Item>
                                <Dropdown.Item>Something else</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton
                                variant="outline-secondary"
                                title="Row Height"
                                className="me-1"
                            >
                                <Dropdown.Item>Action</Dropdown.Item>
                                <Dropdown.Item>Another action</Dropdown.Item>
                                <Dropdown.Item>Something else</Dropdown.Item>
                            </DropdownButton>
                            <Button
                                variant="outline-secondary"
                                className="me-1"
                            >
                                <BiAlarm />
                                Alert
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={handleGenerateForm}
                                className="me-1"
                            >
                                <BiFile />
                                Generate Form
                            </Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="d-flex align-items-center">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="A Theme"
                        className="me-2"
                    />
                    <InputGroup className="me-2">
                        <InputGroup.Text id="basic-addon1">
                            <BiCog />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Subject Area"
                            aria-label="Subject Area"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="me-2">
                        <InputGroup.Text id="basic-addon1">
                            <BiCog />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="A Link"
                            aria-label="A Link"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="me-2">
                        <InputGroup.Text id="basic-addon1">
                            <BiFilter />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Start Date"
                            aria-label="Start Date"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="me-2">
                        <InputGroup.Text id="basic-addon1">
                            <BiFilter />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="End Date"
                            aria-label="End Date"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="me-2">
                        <InputGroup.Text id="basic-addon1">
                            <BiSort />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Progress"
                            aria-label="Progress"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="me-2">
                        <InputGroup.Text id="basic-addon1">
                            <MdDescription />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="A Summary"
                            aria-label="A Summary"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Button variant="outline-secondary">
                        <BiPlus />
                    </Button>
                </Col>
            </Row>
            <Row className="mt-3">
                {records.map((record) => (
                    <Col key={record.id} md={4}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th colSpan={3}>
                                        <DropdownButton
                                            variant="outline-secondary"
                                            title={record.subject}
                                            className="me-2"
                                            drop="down"
                                            size="sm"
                                        >
                                            <Dropdown.Item>
                                                <BiChevronDown />
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <BiBarChartAlt2 />
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <BiGridVertical />
                                            </Dropdown.Item>
                                        </DropdownButton>
                                        <Badge bg="secondary" className="ms-2">
                                            {record.subject.length > 12
                                                ? record.subject.substring(
                                                      0,
                                                      12
                                                  ) + "..."
                                                : record.subject}
                                        </Badge>
                                        <span className="ms-2">
                                            {record.subject === "Philosophy" ||
                                            record.subject === "Psychology"
                                                ? 2
                                                : record.subject ===
                                                  "Physical Exercise"
                                                ? 1
                                                : 3}{" "}
                                            records
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>{record.title}</td>
                                    <td>
                                        <Badge bg="secondary" className="ms-2">
                                            {record.subject.length > 12
                                                ? record.subject.substring(
                                                      0,
                                                      12
                                                  ) + "..."
                                                : record.subject}
                                        </Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{record.link}</td>
                                    <td>
                                        <Badge bg="secondary" className="ms-2">
                                            {record.startDate}
                                        </Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}></td>
                                    <td>
                                        <Badge bg="secondary" className="ms-2">
                                            {record.endDate}
                                        </Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}></td>
                                    <td>
                                        <Badge
                                            bg={
                                                record.progress === "Completed"
                                                    ? "success"
                                                    : record.progress ===
                                                      "In progress"
                                                    ? "warning"
                                                    : "secondary"
                                            }
                                            className="ms-2"
                                        >
                                            {record.progress}
                                        </Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>{record.summary}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                ))}
            </Row>
            <Row className="mt-3">
                <Col>
                    <Button variant="outline-secondary" className="me-2">
                        <BiGroup />
                        New Group
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Main;

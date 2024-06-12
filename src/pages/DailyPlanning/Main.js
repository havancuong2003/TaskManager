import React from "react";
import {
    Button,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    FormControl,
    Nav,
    Navbar,
    Row,
} from "react-bootstrap";
import {
    BsCalendarWeekFill,
    BsGridFill,
    BsPlusCircleFill,
    BsGearFill,
    BsFileEarmarkText,
    BsFunnelFill,
    BsList,
    BsChat,
    BsArrowLeftRight,
    BsArrowLeft,
    BsSearch,
} from "react-icons/bs";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { Table } from "react-bootstrap";

const Main = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid style={{ display: "block" }}>
                <Row>
                    <Navbar.Brand href="#">
                        <BsCalendarWeekFill /> Lịch Trình Hàng Ngày
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={<BsGridFill />}
                            >
                                <Dropdown.Item href="#/action-1">
                                    Grid
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                    Another action
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                    Something else
                                </Dropdown.Item>
                            </DropdownButton>

                            <Nav.Link href="#action1" className="me-2">
                                <BsPlusCircleFill />
                                Thêm bản ghi
                            </Nav.Link>
                            <Nav.Link href="#action2" className="me-2">
                                <BsGearFill />
                            </Nav.Link>
                            <Nav.Link href="#action3" className="me-2">
                                <BsFileEarmarkText />
                            </Nav.Link>
                            <Nav.Link href="#action4" className="me-2">
                                <BsFunnelFill />
                            </Nav.Link>
                            <Nav.Link href="#action5" className="me-2">
                                <BsList />
                            </Nav.Link>
                            <Nav.Link href="#action6" className="me-2">
                                <BsArrowDown /> <BsArrowUp />
                            </Nav.Link>
                            <Nav.Link href="#action7" className="me-2">
                                <BsChat />
                            </Nav.Link>

                            {/* Search bar */}
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">
                                    Search
                                </Button>
                            </Form>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#action1" className="me-2">
                                <BsArrowLeftRight />
                            </Nav.Link>
                            <Nav.Link href="#action2" className="me-2">
                                <BsArrowLeft />
                            </Nav.Link>
                            <Nav.Link href="#action3" className="me-2">
                                <BsSearch />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Khung Giờ</th>
                                <th>Hoạt Động</th>
                                <th>Địa Điểm</th>
                                <th>Mô Tả</th>
                                <th>Người Chịu Trách Nhiệm</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>07:00 - 08:00</td>
                                <td>Tập Thể Dục Buổi Sáng</td>
                                <td>Công Viên</td>
                                <td>
                                    Yoga và thiền để bắt đầu ngày mới năng động
                                </td>
                                <td>Bản Thân</td>
                            </tr>
                            <tr>
                                <td>08:15-09:00</td>
                                <td>Ăn Sáng</td>
                                <td>Nhà</td>
                                <td>Bữa sáng lành mạnh với gia đình</td>
                                <td>Bản Thân và Vợ/Chồng</td>
                            </tr>
                            <tr>
                                <td>09:30 - 11:00</td>
                                <td>Cuộc Họp Công Việc</td>
                                <td>Văn Phòng</td>
                                <td>
                                    Thảo luận mục tiêu quý 2 và kế hoạch hành
                                    động
                                </td>
                                <td>Nhóm Tiếp Thị</td>
                            </tr>
                            <tr>
                                <td>11:15-12:00</td>
                                <td>Thư Từ Email</td>
                                <td>Văn Phòng</td>
                                <td>
                                    Theo kịp email từ khách hàng, phản hồi nhanh
                                    chóng
                                </td>
                                <td>Bản Thân</td>
                            </tr>
                            <tr>
                                <td>13:00 - 14:00</td>
                                <td>Giải Lao Ăn Trưa</td>
                                <td>Nhà Hàng</td>
                                <td>
                                    Ăn trưa nhanh tại cửa hàng gần văn phòng
                                </td>
                                <td>Bản Thân</td>
                            </tr>
                            <tr>
                                <td>14:30 15:30</td>
                                <td>Dự Án Công Việc</td>
                                <td>Văn Phòng</td>
                                <td>Tập trung vào chiến dịch tiếp thị mới</td>
                                <td>Bản Thân và Nhóm</td>
                            </tr>
                            <tr>
                                <td>16:00 - 17:00</td>
                                <td>Cuộc Gọi với Khách Hàng</td>
                                <td>Văn Phòng</td>
                                <td>
                                    Cập nhật tiến độ dự án và trao đổi với khách
                                    hàng
                                </td>
                                <td>Bản Thân</td>
                            </tr>
                            <tr>
                                <td>17:30 - 18:30</td>
                                <td>Chạy Buổi Tối</td>
                                <td>Khu Vực Lân Cận</td>
                                <td>Chạy bộ 30 phút để tăng cường sức khỏe</td>
                                <td>Bản Thân</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </Navbar>
    );
};

export default Main;

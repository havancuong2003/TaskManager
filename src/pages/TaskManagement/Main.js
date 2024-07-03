import React from "react";
import { Table, Col } from "react-bootstrap";

const Main = () => {
    return (
        <Col>
            <h1>Workout Schedule</h1>
            <p className="button1">
                <button className="btn">
                    <i className="bi bi-calendar-plus-fill"></i>
                </button>
            </p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">
                            <input type="date" className="form-control" />
                            <input type="date" className="form-control" />
                        </th>
                        <th className="text-center">Sunday</th>
                        <th className="text-center">Monday</th>
                        <th className="text-center">Tuesday</th>
                        <th className="text-center">Wednesday</th>
                        <th className="text-center">Thursday</th>
                        <th className="text-center">Friday</th>
                        <th className="text-center">Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">8 am</td>
                        <td>
                            <div className="workout-item">
                                Weight Loss
                                <br />8 am - 9 am
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Spinning
                                <br />9 am - 9.30 am
                            </div>
                        </td>
                        <td>
                            <div className="workout-item">
                                Body Building
                                <br />
                                9.30 am - 10 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Racing
                                <br />
                                9.30 am - 10 am
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="text-center">10 am</td>
                        <td>
                            <div className="workout-item">
                                Weight Loss
                                <br />
                                10 am - 11 am
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Spinning
                                <br />
                                10 am - 11 am
                            </div>
                        </td>
                        <td>
                            <div className="workout-item">
                                Body Building
                                <br />
                                10 am - 12 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Racing
                                <br />
                                10 am - 11 am
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="text-center">11 am</td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Cycling
                                <br />
                                11 am - 12 pm
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Bootcamp
                                <br />
                                11 am - 12 pm
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="text-center">03 pm</td>
                        <td>
                            <div className="workout-item">
                                Yoga
                                <br />
                                03 pm - 04 pm
                            </div>
                        </td>
                        <td>
                            <div className="workout-item">
                                Karate
                                <br />
                                03 pm - 05 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Dance
                                <br />
                                03 pm - 05 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Energy Blast
                                <br />
                                03 pm - 05 pm
                            </div>
                        </td>
                        <td>
                            <div className="workout-item">
                                Aerobics
                                <br />
                                03 pm - 04 pm
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">05 pm</td>
                        <td>
                            <div className="workout-item">
                                Boxing
                                <br />
                                05 pm - 06 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Bootcamp
                                <br />
                                05 pm - 06 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Body Building
                                <br />
                                05 pm - 06 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Cycling
                                <br />
                                05 pm - 06 pm
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">07 pm</td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Crossfit
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td>
                            <div className="workout-item">
                                Boxercise
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td>
                            <div className="workout-item">
                                Health
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Jumping
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="text-center">09 pm</td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Crossfit
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Health
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td>
                            <div className="workout-item">
                                Jumping
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="text-center">10 pm</td>
                        <td>
                            <div className="workout-item">
                                Health
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Boxercise
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div className="workout-item">
                                Jumping
                                <br />
                                07 pm - 08 pm
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </Col>
    );
};

export default Main;

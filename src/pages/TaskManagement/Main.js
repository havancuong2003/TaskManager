import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "react-bootstrap";
import AddEditTask from "./AddEditTask"; // Điều chỉnh đường dẫn nếu cần thiết

const localizer = momentLocalizer(moment);

const Main = () => {
    const [events, setEvents] = useState([]);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        fetch("http://localhost:9999/tasks")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const events = data.map((task) => ({
                    id: task.id,
                    title: task.title,
                    start: new Date(`${task.dueDate}T${task.startTime}`),
                    end: new Date(`${task.dueDate}T${task.endTime}`),
                    color: task.color || getRandomColor(),
                }));
                setEvents(events);
            })
            .catch((error) => console.error("Error fetching events:", error));
    };

    const handleSelectEvent = (task) => {
        setSelectedTask(task);
        setShowAddEditModal(true);
    };

    const handleSelectSlot = (slotInfo) => {
        setSelectedTask(null);
        setSelectedDate(slotInfo.start);
        setShowAddEditModal(true);
    };

    const handleCloseAddEditModal = () => {
        setSelectedTask(null);
        setShowAddEditModal(false);
        fetchEvents();
    };

    const eventStyleGetter = (event) => {
        let style = {
            backgroundColor: event.color,
            borderRadius: "5px",
            opacity: 0.8,
            color: "black",
            border: "1px solid #ccc",
            display: "block",
        };
        return {
            style,
        };
    };

    const getRandomColor = () => {
        const colors = ["#f4a261", "#e76f51", "#2a9d8f", "#264653", "#e9c46a"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleAddEditTask = (taskData, isUpdate) => {
        const method = isUpdate ? "PUT" : "POST";
        const url = isUpdate
            ? `http://localhost:9999/tasks/${taskData.id}`
            : "http://localhost:9999/tasks";
        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text);
                    });
                }
                return response.json();
            })
            .then(() => handleCloseAddEditModal())
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
                selectable
                onSelectSlot={handleSelectSlot}
            />

            <Modal show={showAddEditModal} onHide={handleCloseAddEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedTask ? "Edit Task" : "Add Task"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEditTask
                        task={selectedTask}
                        onClose={handleCloseAddEditModal}
                        selectedDate={selectedDate}
                        events={events}
                        onSave={handleAddEditTask}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Main;

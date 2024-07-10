import React, { useState, useEffect } from "react";
import moment from "moment";

const AddEditTask = ({ task, onClose, selectedDate, events, onSave }) => {
    const [taskData, setTaskData] = useState({
        title: "",
        dueDate: selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        if (task) {
            setTaskData({
                title: task.title,
                dueDate: moment(task.start).format("YYYY-MM-DD"),
                startTime: moment(task.start).format("HH:mm"),
                endTime: moment(task.end).format("HH:mm"),
                id: task.id,
            });
        } else {
            setTaskData({
                title: "",
                dueDate: selectedDate
                    ? moment(selectedDate).format("YYYY-MM-DD")
                    : "",
                startTime: "",
                endTime: "",
            });
        }
    }, [task, selectedDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const start = moment(
            `${taskData.dueDate}T${taskData.startTime}`
        ).toISOString();
        const end = moment(
            `${taskData.dueDate}T${taskData.endTime}`
        ).toISOString();

        // Check if the task ends at 11:59 PM
        const endOfDay = moment(taskData.dueDate).endOf("day").toISOString();
        if (moment(end).isSame(endOfDay)) {
            alert("Tasks ending at 11:59 PM cannot be edited or deleted.");
            return;
        }

        // Check if the task is in the past
        if (moment(start).isBefore(moment())) {
            alert("Cannot add or edit tasks in the past.");
            return;
        }

        // Check if Start Time is before End Time
        if (moment(start).isSameOrAfter(end)) {
            alert("Start Time should be before End Time.");
            return;
        }

        // Check for overlapping tasks
        const overlappingTask = events.find((event) => {
            const eventStart = moment(event.start).toISOString();
            const eventEnd = moment(event.end).toISOString();
            return (
                ((start >= eventStart && start < eventEnd) ||
                    (end > eventStart && end <= eventEnd) ||
                    (start <= eventStart && end >= eventEnd)) &&
                (!task || task.id !== event.id)
            );
        });

        if (overlappingTask) {
            alert("The selected time overlaps with another task.");
            return;
        }

        const updatedTaskData = {
            ...taskData,
            start,
            end,
            color: task ? task.color : getRandomColor(),
        };

        console.log(updatedTaskData); // Debug log

        onSave(updatedTaskData, !!task);
    };

    const handleDelete = () => {
        if (!task) return;

        // Check if the task ends at 11:59 PM
        const endOfDay = moment(task.start).endOf("day").toISOString();
        if (moment(task.end).isSame(endOfDay)) {
            alert("Tasks ending at 11:59 PM cannot be edited or deleted.");
            return;
        }

        // Check if the task is in the past
        if (moment(task.start).isBefore(moment())) {
            alert("Cannot delete tasks in the past.");
            return;
        }

        fetch(`http://localhost:9999/tasks/${task.id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text(); // Chuyển đổi thành văn bản nếu không có nội dung JSON
            })
            .then(() => onClose())
            .catch((error) => console.error("Error:", error));
    };

    const getRandomColor = () => {
        const colors = ["#f4a261", "#e76f51", "#2a9d8f", "#264653", "#e9c46a"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const isTaskEndOfDay =
        task && moment(task.end).isSame(moment(task.start).endOf("day"));

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    disabled={isTaskEndOfDay}
                />
            </div>
            <div>
                <label>Due Date:</label>
                <input
                    type="date"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                    disabled={isTaskEndOfDay}
                />
            </div>
            <div>
                <label>Start Time:</label>
                <input
                    type="time"
                    name="startTime"
                    value={taskData.startTime}
                    onChange={handleChange}
                    disabled={isTaskEndOfDay}
                />
            </div>
            <div>
                <label>End Time:</label>
                <input
                    type="time"
                    name="endTime"
                    value={taskData.endTime}
                    onChange={handleChange}
                    disabled={isTaskEndOfDay}
                />
            </div>
            <div className="form-buttons">
                <button
                    type="submit"
                    className={task ? "update-button" : "add-button"}
                    disabled={isTaskEndOfDay}
                >
                    {task ? "Update Task" : "Add Task"}
                </button>
                {task && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="delete-button"
                        disabled={isTaskEndOfDay}
                    >
                        Delete Task
                    </button>
                )}
            </div>
        </form>
    );
};

export default AddEditTask;

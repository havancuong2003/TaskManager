import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [endtime, setEndtime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ task, description, status: "Pending", endtime });
        setTask("");
        setDescription("");
        setEndtime("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="datetime-local"
                value={endtime}
                onChange={(e) => setEndtime(e.target.value)}
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;

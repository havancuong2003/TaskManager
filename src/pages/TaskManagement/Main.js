import React, { useState } from "react";

const Task = ({ task, updateTask }) => {
    const [status, setStatus] = useState(task.status);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        updateTask(task.id, { ...task, status: newStatus });
    };

    return (
        <li>
            <h3>{task.task}</h3>
            <p>{task.description}</p>
            <p>{task.endtime}</p>
            <select value={status} onChange={handleStatusChange}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </li>
    );
};

export default Task;

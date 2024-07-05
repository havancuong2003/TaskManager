import React, { useState, useEffect } from "react";
import Task from "./Main";
import TaskForm from "./TaskForm";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch("http://localhost:9999/tasks");
        const data = await response.json();
        setTasks(data);
    };

    const addTask = async (task) => {
        const response = await fetch("http://localhost:9999/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
    };

    const updateTask = async (id, updatedTask) => {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });
        const data = await response.json();
        setTasks(tasks.map((task) => (task.id === id ? data : task)));
    };

    return (
        <div>
            <h1>Daily Work Management</h1>
            <TaskForm addTask={addTask} />
            <ul>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} updateTask={updateTask} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

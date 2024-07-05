// timeUtils.js
import { parse, isValid, format } from "date-fns";

// Định dạng thời gian cố định
const TIME_FORMAT = "HH:mm";

// Hàm định dạng thời gian
export const formatTime = (time) => {
    const parsedTime = parse(time, TIME_FORMAT, new Date());
    if (!isValid(parsedTime)) {
        throw new Error("Invalid time value");
    }
    return format(parsedTime, TIME_FORMAT);
};

// Hàm kiểm tra tính hợp lệ của thời gian
export const isValidTime = (time) => {
    const parsedTime = parse(time, TIME_FORMAT, new Date());
    return isValid(parsedTime);
};

// Hàm sinh thời gian ngẫu nhiên
export const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
};

// Hàm kiểm tra xung đột thời gian
export const checkTimeConflict = (newTask, existingTasks) => {
    // Đảm bảo rằng newTask.timeStart và newTask.timeEnd là chuỗi hợp lệ
    if (typeof newTask.start !== "string" || typeof newTask.end !== "string") {
        throw new Error(
            "timeStart and timeEnd should be strings in the format HH:mm"
        );
    }

    const newStart = parse(newTask.start, TIME_FORMAT, new Date());
    const newEnd = parse(newTask.end, TIME_FORMAT, new Date());

    return existingTasks.some((task) => {
        // Đảm bảo rằng task.timeStart và task.timeEnd là chuỗi hợp lệ
        if (typeof task.start !== "string" || typeof task.end !== "string") {
            throw new Error(
                "start and end should be strings in the format HH:mm"
            );
        }

        const existingStart = parse(task.start, TIME_FORMAT, new Date());
        const existingEnd = parse(task.end, TIME_FORMAT, new Date());
        return newStart < existingEnd && newEnd > existingStart;
    });
};

// Hàm sắp xếp các task theo thời gian
export const sortTasksByTime = (tasks) => {
    return tasks.sort((a, b) => {
        const timeA = parse(a.start, TIME_FORMAT, new Date());
        const timeB = parse(b.start, TIME_FORMAT, new Date());
        return timeA - timeB;
    });
};

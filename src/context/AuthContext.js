import React, { createContext, useState, useEffect, useContext } from "react";

// Tạo Context
const AuthContext = createContext();

// Tạo Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = (username, password) => {
        // Logic đăng nhập
        const loggedInUser = { username }; // Thay thế bằng logic thực tế
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
    };

    const logout = () => {
        // Logic đăng xuất
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        // Logic đăng nhập
    };

    const logout = () => {
        // Logic đăng xuất
    };

    useEffect(() => {
        // Kiểm tra trạng thái xác thực
    }, []);

    return {
        user,
        login,
        logout,
    };
};

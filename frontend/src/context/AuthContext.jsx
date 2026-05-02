import { createContext, useMemo, useState } from "react";
import { login as loginService, register as registerService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const saved = localStorage.getItem("user");
		return saved ? JSON.parse(saved) : null;
	});

	const login = async (payload) => {
		const data = await loginService(payload);
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data));
		setUser(data);
	};

	const register = async (payload) => {
		const data = await registerService(payload);
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data));
		setUser(data);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
	};

	const value = useMemo(() => ({ user, login, register, logout }), [user]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

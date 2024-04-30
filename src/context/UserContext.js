import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { register, registerAdmin, user, login, logout } = useAuth();

    return (
        <Context.Provider value={{ register, registerAdmin, user, login, logout }}>
            {children}
        </Context.Provider>
    )
};

export { Context, UserProvider };
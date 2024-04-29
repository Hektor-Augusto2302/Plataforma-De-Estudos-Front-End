import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { register, user, login, logout } = useAuth();

    return (
        <Context.Provider value={{ register, user, login, logout }}>
            {children}
        </Context.Provider>
    )
};

export { Context, UserProvider };
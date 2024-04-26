import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { register, autheticated, login, logout } = useAuth();

    return (
        <Context.Provider value={{ register, autheticated, login, logout }}>
            {children}
        </Context.Provider>
    )
};

export { Context, UserProvider };
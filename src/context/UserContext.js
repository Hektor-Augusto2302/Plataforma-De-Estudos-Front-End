import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { register, user, authenticated, login, logout } = useAuth();

    return (
        <Context.Provider value={{ register, user, authenticated, login, logout }}>
            {children}
        </Context.Provider>
    )
};

export { Context, UserProvider };
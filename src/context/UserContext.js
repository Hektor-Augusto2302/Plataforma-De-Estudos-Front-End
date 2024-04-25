import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { register, autheticated, login } = useAuth();

    return (
        <Context.Provider value={{ register, autheticated, login }}>
            {children}
        </Context.Provider>
    )
};

export { Context, UserProvider };
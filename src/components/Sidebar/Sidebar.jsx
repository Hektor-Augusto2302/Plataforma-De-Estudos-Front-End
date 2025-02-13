import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "➖" : "➕"}
        </button>
        <nav>
            <ul>
            <li>
                <Link to="/">🏠 Home</Link>
            </li>
            <li>
                <Link to="/perfil">👤 Perfil</Link>
            </li>
            <li>
                <Link to="/questoes">❓ Questões</Link>
            </li>
            <li>
                <Link to="/admin/registrar">🛠 Registrar Admin</Link>
            </li>
            </ul>
        </nav>
        </div>
    );
};

export default Sidebar;

import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/UserContext';

const Navbar = () => {
    const { user, logout } = useContext(Context);

    return (
        <nav className="d-flex justify-content-between align-items-center navbar navbar-expand-sm">
            <div className="container">
                <NavLink
                    to="/"
                    className={({ isActive }) => "brand navbar-brand" + (isActive ? "" : "")}
                >
                    <h3>Plataforma de Estudos</h3>
                </NavLink>
                <div className="d-flex flex-column justify-content-end">
                    <button
                        className="navbar-toggler navbar-toggler-hamburguer"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-text-left icon-hamburguer"></i>
                    </button>
                    <ul className="navbar-nav collapse navbar-collapse list-unstyled" id="navbarNav">
                        {user ? (
                            <>
                                <li className="links nav-item me-3 mb-1">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        Estatisticas
                                    </NavLink>
                                </li>
                                <li className="links nav-item me-3 mb-1">
                                    <NavLink
                                        to="/perfil"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        Perfil
                                    </NavLink>
                                </li>
                                <li className="links nav-item me-3 mb-1">
                                    <NavLink
                                        to="/questoes"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        Simulado
                                    </NavLink>
                                </li>
                                {user.role === 'admin' && (
                                    <li className="nav-item dropdown">
                                        <button
                                            className="btn btn-dark btn-drop dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Admin
                                        </button>
                                        <ul className="dropdown-menu drop-menu">
                                            <li>
                                                <NavLink
                                                    className={({ isActive }) => `dropdown-item drop-item ${isActive ? 'active' : ''}`}
                                                    to="/admin/registrar"
                                                >
                                                    Registrar Admin
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    className={({ isActive }) => `dropdown-item drop-item ${isActive ? 'active' : ''}`}
                                                    to="/admin/questoes"
                                                >
                                                    Registrar Questões
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                )}
                                <li className="links nav-item me-3 mb-1">
                                    <button onClick={logout}>Sair</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="links nav-item me-3 mb-1">
                                    <NavLink
                                        to="/entrar"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        Entrar
                                    </NavLink>
                                </li>
                                <li className="links nav-item me-3 mb-1">
                                    <NavLink
                                        to="/registrar"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        Registrar
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
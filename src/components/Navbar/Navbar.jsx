import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/UserContext';

const Navbar = () => {
    const { user, logout } = useContext(Context);

    return (
        <nav className="d-flex justify-content-between align-items-center navbar navbar-expand-sm">
            <div className="container">
                <NavLink to="/">
                    <h3 className="brand navbar-brand">Plataforma de Estudos</h3>
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
                                    <NavLink to="/">Home</NavLink>
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
                                                <NavLink className="dropdown-item drop-item" to="/admin/registrar">
                                                    Registrar Admin
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
                                    <NavLink to="/entrar">Entrar</NavLink>
                                </li>
                                <li className="links nav-item me-3 mb-1">
                                    <NavLink to="/registrar">Registrar</NavLink>
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

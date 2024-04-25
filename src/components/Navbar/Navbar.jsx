import './Navbar.css';

import { NavLink } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import { useContext } from 'react';

const Navbar = () => {

    const { authenticated } = useContext(Context);

    return (
        <nav className="d-flex justify-content-between align-items-center navbar navbar-expand-sm">
            <div className="container">
                <NavLink to='/'>
                    <h3 className='brand navbar-brand'>Plataforma de Estudos</h3>
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
                    <ul className="navbar-nav collapse navbar-collapse list-unstyled" id='navbarNav'>
                        {authenticated ?
                            (
                                <>
                                    <li className='links nav-item me-3 mb-1'>
                                        <NavLink to='/'>
                                            Home
                                        </NavLink>
                                    </li>
                                </>
                            ) :
                            (
                                <>
                                    <li className='links nav-item me-3 mb-1'>
                                        <NavLink to='/entrar'>
                                            Entrar
                                        </NavLink>
                                    </li>
                                    <li className='links nav-item me-3 mb-1'>
                                        <NavLink to='/registrar'>
                                            Registrar
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
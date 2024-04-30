import './RegisterAdmin.css';

import { useContext, useState } from 'react';
import { Context } from '../../../context/UserContext';

const RegisterAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { registerAdmin } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        registerAdmin(user);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-6 border-register-admin">
                    <h1 className='mb-5 text-center'>Registrar Admin:</h1>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                            <div className={`container-register-admin mb-5 ${name ? 'has-content' : ''}`}>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-register-admin"
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <label className="label-register-admin">Nome Completo</label>
                            </div>
                            <div className={`container-register-admin mb-5 ${email ? 'has-content' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-register-admin"
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="label-register-admin">E-mail</label>
                            </div>
                            <div className={`container-register-admin mb-5 ${password ? 'has-content' : ''}`}>
                                <input
                                    type="password"
                                    name="password"
                                    className="input-register-admin"
                                    value={password || ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="label-register-admin">Senha</label>
                            </div>
                            <div className={`container-register-admin mb-5 ${confirmPassword ? 'has-content' : ''}`}>
                                <input
                                    type="password"
                                    name="confirmPassowrd"
                                    className="input-register-admin"
                                    value={confirmPassword || ""}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label className="label-register-admin">Confirme a Senha</label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input
                                    type="submit"
                                    className="my-2 input-button"
                                    value="Registrar"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterAdmin
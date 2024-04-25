import { Context } from '../../../context/UserContext';
import './Login.css';

import { useContext, useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(Context);

    const handleLogin = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        }

        login(user);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-6 border-login">
                    <h1 className='mb-5 text-center'>Entrar:</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                            <div className={`container-login mb-5 ${email ? 'has-content' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-login"
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="label-login">E-mail</label>
                            </div>
                            <div className={`container-login mb-5 ${password ? 'has-content' : ''}`}>
                                <input
                                    type="password"
                                    name="password"
                                    className="input-login"
                                    value={password || ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="label-login">Senha</label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input
                                    type="submit"
                                    className="my-2 input-button-login"
                                    value="Entrar"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
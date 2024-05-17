import { Context } from '../../../context/UserContext';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {

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
        onLogin();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className='container mt-5'
        >
            <div className="row justify-content-center">
                <div className="col-6 border-form">
                    <h1 className='mb-5 text-center'>Entrar:</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                            <div className={`container-form mb-5 ${email ? 'has-content' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-form"
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="label-form">E-mail</label>
                            </div>
                            <div className={`container-form mb-5 ${password ? 'has-content' : ''}`}>
                                <input
                                    type="password"
                                    name="password"
                                    className="input-form"
                                    value={password || ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="label-form">Senha</label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input
                                    type="submit"
                                    className="my-2 input-button"
                                    value="Entrar"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default Login
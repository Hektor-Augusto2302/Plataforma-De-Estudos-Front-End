import { useState, useContext} from 'react';
import { Context } from '../../../context/UserContext';
import { motion } from 'framer-motion';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { register } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        register(user);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
                    <h1 className='mb-5 text-center'>Registrar:</h1>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                            <div className={`container-form mb-5 ${name ? 'has-content' : ''}`}>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-form"
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <label className="label-form">Nome Completo</label>
                            </div>
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
                            <div className={`container-form mb-5 ${confirmPassword ? 'has-content' : ''}`}>
                                <input
                                    type="password"
                                    name="confirmPassowrd"
                                    className="input-form"
                                    value={confirmPassword || ""}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label className="label-form">Confirme a Senha</label>
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
        </motion.div>
    )
}

export default Register
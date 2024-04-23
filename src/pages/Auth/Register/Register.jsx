import './Register.css';

const Register = () => {

    const handleRegister = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-6 border-register">
                    <h1 className='mb-5 text-center'>Registrar o Usuário:</h1>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                            <div className="container-register mb-5">
                                <input
                                    type="text"
                                    name="name"
                                    className="input-register"
                                />
                                <label className="label-register">Nome Completo</label>
                            </div>
                            <div className="container-register mb-5">
                                <input
                                    type="email"
                                    name="email"
                                    className="input-register"
                                />
                                <label className="label-register">E-mail</label>
                            </div>
                            <div className="container-register mb-5">
                                <input
                                    type="password"
                                    name="password"
                                    className="input-register"
                                />
                                <label className="label-register">Senha</label>
                            </div>
                            <div className="container-register mb-5">
                                <input
                                    type="password"
                                    name="confirmPassowrd"
                                    className="input-register"
                                />
                                <label className="label-register">Confirme a Senha</label>
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

export default Register
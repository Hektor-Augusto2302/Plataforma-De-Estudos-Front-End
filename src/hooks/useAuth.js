import api from '../utils/api';

import { useState, useEffect } from 'react';
import useFlashMessage from './useFlashMessage';

export const useAuth = () => {
    const [autheticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
    }, []);

    const authUser = async (data) => {
        setAuthenticated(true);

        localStorage.setItem('token', JSON.stringify(data.token));

        window.location.replace('/');
    };

    const register = async (user) => {

        let msgText = 'Cadastro realizado com sucesso!';
        let typeMsg = 'success';

        try {
            const data = await api.post('/api/users/register/user', user).then((response) => {
                return response.data
            });

            authUser(data);
        } catch (error) {
            msgText = error.response.data.errors;
            typeMsg = 'error';
        }

        setFlashMessage(msgText, typeMsg)
    };

    const login = async (user) => {
        let msgText = 'Login realizado com sucesso!';
        let typeMsg = 'success';

        try {
            const data = await api.post('/api/users/login', user).then((response) => {
                return response.data
            });

            await authUser(data);
        } catch (error) {
            msgText = error.response.data.errors;
            typeMsg = 'error';
        }

        setFlashMessage(msgText, typeMsg);
    };

    const logout = () => {
        const msgText = 'logout realizado com sucesso!';
        const typeMsg = 'success';

        setAuthenticated(false);

        localStorage.removeItem('token');

        api.defaults.headers.Authorization = undefined;

        setFlashMessage(msgText, typeMsg);
        
        window.location.replace('/entrar');
    };

    return { register, autheticated, login, logout }
}
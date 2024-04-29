import api from '../utils/api';
import { useState, useEffect } from 'react';
import useFlashMessage from './useFlashMessage';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

            api.get('/api/users/profile')
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao obter o perfil do usuário:", error);
                    setUser(null);
                });
        } else {
            setUser(null);
        }
    }, []);

    const authUser = (data) => {
        localStorage.setItem('token', JSON.stringify(data.token));
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        setUser(data.user);
        window.location.replace('/');
    };

    const register = async (userData) => {
        let msgText = 'Cadastro realizado com sucesso!';
        let typeMsg = 'success';

        try {
            const response = await api.post('/api/users/register/user', userData);
            authUser(response.data);
            setFlashMessage(msgText, typeMsg);
        } catch (error) {
            msgText = error.response?.data?.errors || 'Erro desconhecido';
            typeMsg = 'error';
            setFlashMessage(msgText, typeMsg);
        }
    };

    const login = async (userData) => {
        let msgText = 'Login realizado com sucesso!';
        let typeMsg = 'success';

        try {
            const response = await api.post('/api/users/login', userData);
            authUser(response.data);
            setFlashMessage(msgText, typeMsg);
        } catch (error) {
            msgText = error.response?.data?.errors || 'Erro desconhecido';
            typeMsg = 'error';
            setFlashMessage(msgText, typeMsg);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        setUser(null);
        setFlashMessage('Logout realizado com sucesso!', 'success');
        window.location.replace('/entrar');
    };

    return { register, user, login, logout };
};

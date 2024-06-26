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
        setTimeout(() => {
            window.location.replace('/');
        }, 3000)
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

    const registerAdmin = async (adminData) => {
        if (!user || user.role !== 'admin') {
            setFlashMessage('Acesso negado. Apenas administradores podem registrar administradores.', 'error');
            return;
        }
    
        let msgText = 'Registro de administrador realizado com sucesso!';
        let typeMsg = 'success';
    
        try {
            await api.post('/api/users/register/admin', adminData); 
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
        setTimeout(() => {
            window.location.replace('/entrar');
        }, 3000)
    };

    return { register, registerAdmin, user, login, logout };
};

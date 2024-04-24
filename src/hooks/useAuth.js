import api from '../utils/api';

import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [autheticated, setAuthenticated] = useState(false);

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
        try {
            const data = await api.post('/api/users/register/user', user).then((response) => {
                return response.data
            });

            authUser(data);
        } catch (error) {
            console.log(error)
        }
    };

    return { register, autheticated }
}
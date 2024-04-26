import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

            api.get('/api/users/profile')
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar o perfil:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;

import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';

const AdminRoute = ({ children, role, redirectTo = "/" }) => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user !== null) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user || (role && user.role !== role)) {
        return <Navigate to={redirectTo} />;
    }

    return children;
};

export default AdminRoute;

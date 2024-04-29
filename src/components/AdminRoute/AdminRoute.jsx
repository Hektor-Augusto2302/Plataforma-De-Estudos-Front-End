import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';

const AdminRoute = ({ children }) => {
    const { user } = useContext(Context);

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;

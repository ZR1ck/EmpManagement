import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthProvider';


const PrivateRoute = ({ element }) => {
    // const { isAuthenticated } = useAuthContext();
    const  isAuthenticated = true;

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;

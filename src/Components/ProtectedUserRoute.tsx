import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from './Loader';

const ProtectedUserRoute = () => {
  const { data: user, isPending } = useAuth();
  if (isPending) return <Loader />;
  if (user && user.success && user.isAuthenticated && user.role === "user")
    return <Outlet />
  else
    return <Navigate to="/login" />
}

export default ProtectedUserRoute

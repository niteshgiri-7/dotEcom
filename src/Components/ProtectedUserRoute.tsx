import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from './Loader';

const ProtectedUserRoute = () => {
  const { data: user, isPending } = useAuth();

  if (isPending) return <Loader />;

  if (user && user.success && user.isAuthenticated && user.role === "admin")
    return <Navigate to="/login" />

  //TL;DR ===>user.role is undefined during signUp
  else if (user && user.success && user.isAuthenticated)//needed to do this trick cause whenever a new user signs up, backend would be setting up customClaim(role=user), to get that custom claim , could have called getIdToken(true).. but don't want to do that at every page refresh.(refresh-token existence would be nothing if we refresh token at every page refresh)
    return <Outlet />

  else
    return <Navigate to="/login" />
}

export default ProtectedUserRoute

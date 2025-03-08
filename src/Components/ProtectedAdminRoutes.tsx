import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

const ProtectedAdminRoutes = () => {
  const { data: user, isPending } = useAuth();

  if (isPending) return <Loader />;

  if (user?.success && user.isAuthenticated && user.role === "admin") {
    return <Outlet />
  } else return <Navigate to="/login" replace/>;
};

export default ProtectedAdminRoutes;

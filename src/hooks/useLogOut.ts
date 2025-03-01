import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiryTime");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  return {handleLogOut};
};

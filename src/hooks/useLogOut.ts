import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiryTime");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("pidx");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("purchaseId");
    navigate("/login",{replace:true});
  };

  return {handleLogOut};
};

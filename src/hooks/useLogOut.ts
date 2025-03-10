import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Axios from "../api/axiosInstance";
import { removeAuthFromLocalStorage } from "../utils/localStorage";

export const useLogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut(getAuth());
      const { status } = await Axios.post("/user/logOut");
      localStorage.removeItem("rememberMe");
      removeAuthFromLocalStorage();
      if (status === 200) navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogOut };
};

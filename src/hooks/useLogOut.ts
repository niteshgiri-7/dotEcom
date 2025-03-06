import { useNavigate } from "react-router-dom";
import Axios from "../api/axiosInstance";

export const useLogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const { status } = await Axios.post("/user/logOut");
      if (status === 200) navigate("/login", { replace: true });
    } catch (error) {
      console.log("Fail to logOut");
      console.log(error);
    }
  };

  return { handleLogOut };
};

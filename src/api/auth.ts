import { getAuth } from "firebase/auth";
import Axios from "./axiosInstance";

interface IAuthResponse {
  success: boolean;
  message: string;
  isAuthenticated: boolean;
  role: "user" | "admin"|string;
}

const auth = getAuth();

export const checkAuth = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const { data } = await Axios.get<IAuthResponse>("/user/checkAuth");

  return data;
};

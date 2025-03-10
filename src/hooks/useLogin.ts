import { AxiosError } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../api/axiosInstance";
import { fireBaseAuth } from "../firebase/firebase";
import { ILoginResponse } from "../types/login";
import { setAuthInLocalStorage } from "../utils/localStorage";

export interface IuserCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IError {
  name: string;
  isError: boolean;
  message: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({
    isError: false,
    name: "",
    message: "",
  });

  const clearError = () => {
    if (error.isError)
      setError((prev) => ({ ...prev, isError: false, name: "", message: "" }));
  };

  const handleLogin = async (userData: IuserCredentials) => {
    try {
      const { email, password, rememberMe } = userData;
      setIsLoading((prev) => !prev);
      const login = await signInWithEmailAndPassword(
        fireBaseAuth,
        email,
        password
      );
      const { user } = login;
      const token = await user.getIdToken(true);

      const { data, status } = await Axios.post<ILoginResponse>(
        "/user/login",
        { rememberMe },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        setAuthInLocalStorage(data.user.role);
        if (data.user.role === "admin")
          navigate("/admin/dashboard", { replace: true });
        else navigate("/home", { replace: true });
      }

      setIsLoading((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("(auth/email-already-in-use)"))
          setError((prev) => ({
            ...prev,
            message: "Email Already Exists",
            isError: true,
          }));
        if (error.message.includes("(auth/invalid-credential)"))
          setError((prev) => ({
            ...prev,
            message: "Invalid Credentials",
            isError: true,
          }));
        else if (error instanceof AxiosError)
          setError((prev) => ({
            ...prev,
            isError: true,
            name: error.name,
            message: error.response?.data?.message,
          }));
        setIsLoading(false);
      }
    }
  };

  return { isLoading, error, setError, handleLogin, clearError };
};

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { fireBaseAuth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Axios from "../api/axiosInstance";
import { ILoginResponse } from "../types/login";

export interface IuserCredentials {
  email: string;
  password: string;
  rememberMe:boolean;
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

  const clearError=()=>{
    setError((prev)=>({...prev,isError:false,name:"",message:""}))
  }

  const handleLogin = async (userData: IuserCredentials) => {
    try {

      const { email, password ,rememberMe} = userData;
      setIsLoading((prev) => !prev);
      const login = await signInWithEmailAndPassword(
        fireBaseAuth,
        email,
        password
      );
      const {user} = login;
      const token = await user.getIdToken(true);
     
      const {data,status} = await Axios.post<ILoginResponse>("/user/login",{rememberMe},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      
       

      if(status===200){
        if(data.user.role==="admin")
          navigate("/admin/dashboard",{replace:true});
        else
          navigate("/home",{replace:true});
      }
     
      setIsLoading((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("(auth/email-already-in-use)"))
          setError((prev) => ({ ...prev, message: "Email Already Exists" }));
        if(error.message.includes("(auth/invalid-credential)"))
          setError((prev)=>({...prev,message:"Invalid Credentials"}))
        else
        setError((prev) => ({
          ...prev,
          isError: true,
          name: error.name,
          message: error.message,
        }));
        setIsLoading((prev) => !prev);
      }
    }
  };

  return { isLoading, error,setError, handleLogin , clearError};
};

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { fireBaseAuth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export interface IuserCredentials {
  email: string;
  password: string;
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
    let user =null;
    try {

      const { email, password } = userData;
      setIsLoading((prev) => !prev);
      const login = await signInWithEmailAndPassword(
        fireBaseAuth,
        email,
        password
      );

       user = login.user; 
      const token = await user.getIdToken(true);
      const {expirationTime,claims} = await user.getIdTokenResult();
      
     localStorage.setItem("token",token);
     localStorage.setItem("refreshToken",user.refreshToken);
     localStorage.setItem("tokenExpiryTime",expirationTime);
    
      if(claims.role==="admin" && token) navigate("/admin/dashboard");
      else navigate("/home");
     
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

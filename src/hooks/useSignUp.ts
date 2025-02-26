import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { useState } from "react";
import Axios from "../api/axiosInstance";
import { fireBaseAuth } from "../firebase/firebase";
import { ILoginResponse, ISignUpFormValues } from "../types/login";
import { appendSignUpFromData } from "../utils/appendFormData";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";

export interface IuserCredentials {
  email: string;
  password: string;
}

export interface IError {
  name: string;
  isError: boolean;
  message: string;
}

export const useSignUp = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({
    isError: false,
    name: "",
    message: "",
  });

  const handleSignUp = async (userData: ISignUpFormValues) => {
    let user = null;//to delete the user upon failing to save user in backend(firebase le user save garyo tara backend le garena vaney tala catch block ma user delete garna lai)
    try {
      const { email, password } = userData;
      setIsLoading((prev) => !prev);

      const signUp = await createUserWithEmailAndPassword(
        fireBaseAuth,
        email,
        password
      );

      user = signUp.user;
      const token = await user.getIdToken(true);

      let formData = new FormData();
      //user is being passed additionally to append the uid of user in the form(user.uid)
      formData = appendSignUpFromData(formData, userData, user);

      const { data, status } = await Axios.post<ILoginResponse>(
        "/user/signUp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (status === 201) {
        const { expirationTime } = await user.getIdTokenResult();

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", user.refreshToken);
        localStorage.setItem("tokenExpiryTime", expirationTime);
      } else {
        console.log("Backend error", data.message);
        throw new Error(data.message);
      }

      if (data.user.role === "admin") navigate("/admin/dashboard");
      else console.log("wait for user");

      setIsLoading(false);
    } catch (error) {
      console.log("hello from error",error)
      if (user) {
        await deleteUser(user);
        console.log("user deleted due to backend error");
      }
      if(error instanceof FirebaseError)
        setError((prev)=>({...prev,name:error.name,isError:true,message:error.code}))
        
      if(error instanceof AxiosError){
        setError((prev)=>({...prev,name:error.name,isError:true,message:error.response?.data.message}))
      }
     setIsLoading((prev)=>!prev);
    }
  };

  return { isLoading, error, handleSignUp };
};

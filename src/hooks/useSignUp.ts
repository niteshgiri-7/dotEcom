import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../api/axiosInstance";
import { fireBaseAuth } from "../firebase/firebase";
import { ILoginResponse, ISignUpFormValues } from "../types/login";
import { appendSignUpFromData } from "../utils/appendFormData";
import deleteUserFromFireBase from "../utils/deleteUserFromFirebase";

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
    let newlyCreatedFireBaseUser = null; //to delete the user upon failing to save user in backend(firebase le user save garyo tara backend le garena vaney tala catch block ma user delete garna lai)
    try {
      const { email, password } = userData;
      setIsLoading((prev) => !prev);

      const { user } = await createUserWithEmailAndPassword(
        fireBaseAuth,
        email,
        password
      );
      newlyCreatedFireBaseUser = user;
      const token = await user.getIdToken();

      let formData = new FormData();
      //user is being passed additionally to append the uid of user in the form(user.uid)
      formData = appendSignUpFromData(formData, userData, user);

      const { data, status } = await Axios.post<ILoginResponse>(
        "/user/signUp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 201) {
        const { role } = data.user;

        if (role === "admin") navigate("/admin/dashboard", { replace: true });
        else navigate("/home", { replace: true });
      } else {
        console.log("Backend error", data.message);
        throw new Error(data.message);
      }

      setIsLoading(false);
    } catch (error) {
      await deleteUserFromFireBase(newlyCreatedFireBaseUser);

      if (error instanceof FirebaseError)
        setError((prev) => ({
          ...prev,
          name: error.name,
          isError: true,
          message: error.code,
        }));

      if (error instanceof AxiosError) {
        setError((prev) => ({
          ...prev,
          name: error.name,
          isError: true,
          message: error.response?.data.message,
        }));
      }
      setIsLoading((prev) => !prev);
    }
  };

  return { isLoading, error, handleSignUp };
};

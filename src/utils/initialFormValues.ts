import { IuserCredentials } from "../hooks/useLogin";
import { ISignUpFormValues } from "../types/login";

export const signUpFromInitialValues: ISignUpFormValues = {
  name: "",
  email: "",
  password: "",
  dob: "",
  photo: "",
  gender: "male",
};

export const LoginFormInitialValues: IuserCredentials = {
  email: "",
  password: "",
  rememberMe:false,
};

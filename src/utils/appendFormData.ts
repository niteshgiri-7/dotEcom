import { User } from "firebase/auth";
import { ISignUpFormValues } from "../types/login";
import { ProductFormData } from "../types/product";

export const appendProductFormData = (
  formData: FormData,
  data: ProductFormData
) => {
  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("stock", data.stock);
  formData.append("category", data.category);
  formData.append("photo", data.photo);
  
  return formData;
};

export const appendSignUpFromData = (
  formData: FormData,
  data: ISignUpFormValues,
  user:User
) => {
  formData.append("uid",user.uid);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("DOB", data.dob);
  formData.append("gender", data.gender);
  formData.append("photo", data.photo);
  formData.append("role","user")
 
  return formData;
};

import { ProductFormData } from "../types/product";

export const appendFormData = (formData:FormData,data:ProductFormData)=>{
    console.log("form appending",data._id,data.category)
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("photo",data.photo)
    return formData;
}
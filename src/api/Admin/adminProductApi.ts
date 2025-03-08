import { requestConfigWithAuthToken, requestConfigWithMultipartFormDataAndAuthToken } from "../axiosConfig";
import { ProductFormData, ProductResponse } from "../../types/product";
import { appendProductFormData } from "../../utils/appendFormData";
import Axios from "../axiosInstance";





export const addNewProduct = async (values: ProductFormData) => {

    let formData = new FormData();
    
    formData=appendProductFormData(formData,values);
    
    const {data}:{data:ProductResponse} = await Axios.post("/products/add-new",formData,requestConfigWithMultipartFormDataAndAuthToken);
    return data;
}

export const editProduct = async({values,id}:{values:ProductFormData,id:string|number})=>{

    let formData = new FormData();
    formData= appendProductFormData(formData,values);
    const response = await Axios.put(`/products/${id}`,formData,requestConfigWithMultipartFormDataAndAuthToken);
    return response;

}

export const deleteProduct = async(id:string|number)=>{
      const {data}:{data:ProductResponse} = await Axios.delete(`/products/${id}`,requestConfigWithAuthToken);
      return data;
}
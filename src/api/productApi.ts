import { AxiosRequestConfig } from "axios";
import { ProductFormData, ProductResponse } from "../types/product";
import Axios from "./axiosInstance";
import { appendFormData } from "../utils/appendFormData";

export const getAllProducts = async (): Promise<ProductResponse> => {
    console.log("calling all products api")
    const { data }: { data: ProductResponse } = await Axios.get("/products/all");
    return data;
}

export const getProductDetails = async (id: number|string): Promise<ProductResponse> => {
    console.log("calling product details api")
    const { data }: { data: ProductResponse } = await Axios.get(`/products/1234/?id=${id}`);
    return data;
}



export const addNewProduct = async (values: ProductFormData) => {

    let formData = new FormData();
    
    formData=appendFormData(formData,values);
    
    const config:AxiosRequestConfig={
        headers:{
            "Content-Type":"multipart/form-data" 
        }
    }
    const {data}:{data:ProductResponse} = await Axios.post("/products/add/1234",formData,config);
    return data;
}

export const editProduct = async({values,id}:{values:ProductFormData,id:string|number})=>{

    let formData = new FormData();
    formData= appendFormData(formData,values);
    console.log(values,"data")
    console.log(formData,"from edit")
    const config:AxiosRequestConfig={
        headers:{
            "Content-Type":"multipart/form-data" 
        }
    }
    const response = await Axios.put(`/products/1234?productId=${id}`,formData,config);
    return response;

}

export const deleteProduct = async(id:string|number)=>{
      const {data}:{data:ProductResponse} = await Axios.delete(`/products/1234?productId=${id}`);
      return data;
}
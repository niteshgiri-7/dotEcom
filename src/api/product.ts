import { ProductResponse } from "../types/product";
import { requestConfigWithAuthToken } from "./axiosConfig";
import Axios from "./axiosInstance";

export const getAllProducts = async () => {
    console.log("calling all products api")
    const {data} = await Axios.get<ProductResponse>("/products/all");
    console.log("hello from axios",data)
    return data;
}

export const getProductDetails = async (id: number|string): Promise<ProductResponse> => {
    console.log("calling product details api")
    const { data }: { data: ProductResponse } = await Axios.get(`/products/../${id}`,requestConfigWithAuthToken);
    return data;
}
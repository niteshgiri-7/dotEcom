import { ProductResponse } from "../types/product";
import Axios from "./axiosInstance";

export const getAllProducts = async () => {
    const {data} = await Axios.get<ProductResponse>("/products/all");
    return data;
}

export const getProductDetails = async (id: number|string): Promise<ProductResponse> => {
    const { data }: { data: ProductResponse } = await Axios.get(`/products/../${id}`);
    return data;
}
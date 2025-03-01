import { requestConfigWithAuthToken } from './axiosConfig';
import Axios from "./axiosInstance";

interface CategoryResponse {
    success:boolean;
    categories: string[];
}

export const getAllCategories = async ()=>{
    const {data} = await Axios.get<CategoryResponse>("/products/categories",requestConfigWithAuthToken);
    return data.categories;


}
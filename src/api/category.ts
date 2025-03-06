import Axios from "./axiosInstance";

interface CategoryResponse {
    success:boolean;
    categories: string[];
}

export const getAllCategories = async ()=>{
    const {data} = await Axios.get<CategoryResponse>("/products/categories");
    return data.categories;
}
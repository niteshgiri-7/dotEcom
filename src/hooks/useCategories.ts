import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/category";

export const useCategories = ()=>{
    const {data:categories} = useQuery({
        queryKey:["allCategories"],
        queryFn:getAllCategories,
    });

    return {categories}
}
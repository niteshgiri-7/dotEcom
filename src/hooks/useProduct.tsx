import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts, getProductDetails } from "../api/productApi";
import { Product, ProductResponse } from "../types/product";

export const useProducts = ()=>{
    const {data:response,isError,error,isPending} = useQuery<ProductResponse,Error>({
        queryKey:["allProducts"],
        queryFn:getAllProducts,
    });
    const productsArray:Product[]= response?.Products as Product[];

    return {productsArray,isError,error,isPending};
};

export const useProductDetails = (id:number|string)=>{
    const queryClient = useQueryClient();
    const cachedProductDetailsApiResponse:ProductResponse|undefined = queryClient.getQueryData(["allProducts"]);
    console.log(cachedProductDetailsApiResponse,"api response cached")
    return (
        useQuery({
            queryKey:[`product${id}`],
            queryFn:()=>getProductDetails(id),
            initialData:cachedProductDetailsApiResponse,
            staleTime:5*60*1000,
            enabled:!cachedProductDetailsApiResponse
        })
    )

} 
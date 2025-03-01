import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts, getProductDetails } from "../api/product";
import { Product, ProductResponse } from "../types/product";

export const useProducts = ()=>{
    const {data,isError,error,isPending} = useQuery({
        queryKey:["allProducts"],
        queryFn:getAllProducts,
    });
    console.log(data)
    const productsArray:Product[]= data?.Products as Product[]  ;
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
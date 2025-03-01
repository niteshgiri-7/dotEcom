import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/Admin/adminProductApi";
import { ProductResponse } from "../types/product";

export const useDeleteProduct = (id:number|string)=>{
       const queryClient = useQueryClient();
       const navigate = useNavigate();
    return (
        useMutation({
            mutationKey:[`product${id}`],
            mutationFn:deleteProduct,

            onMutate:()=>{
                console.log("mutating")
                const prevProductApiResponse:ProductResponse|undefined = queryClient.getQueryData(["allProducts"]);

                const productDetailsApiResponse:ProductResponse|undefined=queryClient.getQueryData([`product${id}`]);

                queryClient.setQueryData(["allProducts"],(old:ProductResponse)=>(
                    {...old,Products:old?.Products?.filter(p=>p._id!==id)}
                ));

                queryClient.setQueryData([`product${id}`],(old:ProductResponse)=>{old.productDetails=undefined})

                return {prevProductApiResponse,productDetailsApiResponse};
            },
              
            onSuccess:()=>{
                queryClient.invalidateQueries({
                    queryKey:["allProducts"],
                    refetchType:"all"
                });
                queryClient.removeQueries({
                    queryKey:[`product${id}`]
                });
                navigate("/admin/products");
                toast.success("Product deleted Successfully");
            },

            onError:(error,variables,context) =>{
                 
                queryClient.setQueryData([`product${id}`],context?.productDetailsApiResponse);
                queryClient.setQueryData(["allProducts"],context?.prevProductApiResponse);

                toast.error(`Failed to delete ${variables} `);
                console.log(error.message)
            }
        }
    )
)
}

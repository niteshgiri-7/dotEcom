import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { editProduct } from "../../api/Admin/adminProductApi";
import { Product, ProductResponse } from "../../types/product";

export const useEditProduct = (id:string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editProduct"],
    mutationFn: editProduct,

    onMutate:(updatedProduct)=>{
        
        const prevProductApiResponse:ProductResponse|undefined = queryClient.getQueryData(["allProducts"]);

        const productBeforeUpdate= prevProductApiResponse?.Products?.filter(p=>p._id===id)[0] 
          ||
        queryClient.getQueryData<ProductResponse>([`product${id}`])?.productDetails;
          
         
        queryClient.setQueryData([`product${id}`],(old:Product)=>({...old,updatedProduct}));
        
        //why ? here in old.Products, because if directly product details page ma gako cha waah product details page refresh vako cha vaney,allProducts ko response undefined huncha as the cachedData goes way whenever page refreshes,network call garnu parch.
        // tei vayera jaba,tesari page refresh vako huncha product manage page maa, update garera /admin/products page ma navigate huda feri network call huncha(plus tala on success maa refetch vayi racha)
        queryClient.setQueryData(["allProducts"],(old:ProductResponse)=>({...old,Products:[...(old?.Products || []),updatedProduct]}));

        
        return {productBeforeUpdate,prevProductApiResponse};
    },
       
    onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:["allProducts"],
            refetchType:"all"
        })
        queryClient.invalidateQueries({
            queryKey:[`product${id}`],
            refetchActive:true,
            refetchType:"all"
        })
        navigate("/admin/products");
        toast.success("Product Updated Successfully!",{duration:3000});
    },

    onError:(error:AxiosError<ProductResponse,Error>,variables,context)=>{
    console.log(error.response?.data.message);
    toast.error(`Failed to Update Product ${variables?.values?.name}`);
    queryClient.setQueryData(["allProducts"],context?.prevProductApiResponse);
    queryClient.setQueryData([`product${id}`],context?.productBeforeUpdate);
    }

  });
};

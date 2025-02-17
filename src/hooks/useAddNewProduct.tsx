import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNewProduct } from "../api/productApi"
import toast from "react-hot-toast"
import { ProductResponse } from "../types/product";
import { AxiosError } from "axios";

export const useAddNewProduct = (closeForm: () => void) => {

  const queryClient = useQueryClient();

  return (

    useMutation({

      mutationKey: ["addProduct"],
      mutationFn: addNewProduct,

      onMutate: (newProduct) => {

        const prevProductApiResponse: ProductResponse = queryClient.getQueryData(["allProducts"])!;

        //to optimistically update the UI while the network call is happening under the hood
        // here,callback returns an object with copy of the oldApi response(which has property as Products(an array)).
        //copies the original array as it is in the (old.Products) and adds new object(productFormData) inside the Products array
        //fallback for the products as empty array, because initially there could be no products in the database
        queryClient.setQueryData(["allProducts"], (old: ProductResponse)=>({...old,Products:[...(old.Products || [] ),newProduct]}));


        return { prevProductApiResponse };
      },

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey:["allProducts"],
          exact:true,//this will only invalidate the queries with the exact query key, if you false cha vaney all the subset of the queryKey invalidate huncha
        })

        closeForm();

        toast.success("Product Successfully Added");
      },

      onError: (error:AxiosError<ProductResponse,Error>,variables, context) => {

        queryClient.setQueryData(["allProducts"],context?.prevProductApiResponse);

        toast.error(`Failed to Add Product ${variables.name.toLocaleUpperCase()}!\n ${error.response?.data.message}`);

        console.log(error)
      }
    })
  )
}


import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteOrder from "../../api/User/deleteOrder"
import { myOrderResponse } from "../../api/User/getMyOrders"
import toast from "react-hot-toast";

const useDeleteOrder = (id:string)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deleteOrder,
        onMutate:()=>{
            const prevMyOrderResponse:myOrderResponse|undefined = queryClient.getQueryData(["myOrders"]) ;
            if(!prevMyOrderResponse) return;

           queryClient.setQueryData(["myOrders"],(old:myOrderResponse)=>(
              {...old,orders:old.orders.filter(o=>o._id!==id)}
           ))

           return {prevMyOrderResponse};
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["myOrders"],
                refetchType:"all"
            });
            toast.success("Order Cancelled Successfully!");
        },
        onError:(error,_variables,context)=>{
            queryClient.setQueryData(["myOrders"],context?.prevMyOrderResponse);
            toast.error("Failed to Cancel Order");
            console.log(error);
        }
    })
};

export default useDeleteOrder;
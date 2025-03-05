import { useQuery } from "@tanstack/react-query"
import { getMyOrders } from "../../api/User/getMyOrders"


export const useMyOrders=()=>{
    return useQuery({
        queryKey:["myOrders"],
        queryFn:getMyOrders
    })
}

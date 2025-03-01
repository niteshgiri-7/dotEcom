import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createNewCoupon, getAllCoupons } from "../api/Admin/couponApi"
import toast from "react-hot-toast";

export const useCoupon =()=>{
    return useQuery({
        queryKey:["allCoupons"],
        queryFn:getAllCoupons
    })
};

export const useCreateNewCoupon=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["createCoupon"],
        mutationFn:createNewCoupon,
        onSuccess:()=>{
            console.log("created successfully");
            toast.success("Coupon Created Successfully!");
            queryClient.invalidateQueries({
                queryKey:["allCoupons"]
            })
        }
    })
}
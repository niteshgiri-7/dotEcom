import { useMutation } from "@tanstack/react-query";
import { initiatePayment } from "../../api/User/initiatePayment";


export const usePayWithKhalti = ()=>{
    return useMutation({
        mutationFn:initiatePayment,
        onSuccess:({paymentUrl,pidx,purchaseId})=>{
            window.location.href = paymentUrl;
            localStorage.setItem("pidx",pidx)
            localStorage.setItem("purchaseId",purchaseId);
        }
    })
}
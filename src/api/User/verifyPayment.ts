import { OrderedItem } from "../../types/payment";
import { requestConfigWithAuthToken } from "../axiosConfig";
import Axios from "../axiosInstance";

interface IVerifyPaymentPayload{
    pidx:string;
    purchaseId:string;
}

interface IverifyPaymentResponse{
    success:false,
    message:false,
    order: OrderedItem[]
}

const getPaymentVerificationPayload =():IVerifyPaymentPayload|null=>{
    try {
         const pidx = localStorage.getItem("pidx")||"";
         const purchaseId = localStorage.getItem("purchaseId")||"";
         
         if(!pidx || !purchaseId) return null;
         return {pidx,purchaseId};
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const verifyPayment = async()=>{

   const payload = getPaymentVerificationPayload();

   if(!payload) return console.log("missing payload");

    const {data} = await Axios.post<IverifyPaymentResponse>("/payment/verify",payload,requestConfigWithAuthToken)
    return data;
}
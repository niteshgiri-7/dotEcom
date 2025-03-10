import { IinitiatePaymentRequestPayload, IinitiatePaymentResponse } from "../../types/payment"
import Axios from "../axiosInstance"

export const initiatePayment = async(payload:IinitiatePaymentRequestPayload)=>{
    const {data} = await Axios.post<IinitiatePaymentResponse>("/payment/initiate",payload);

    return data;
}
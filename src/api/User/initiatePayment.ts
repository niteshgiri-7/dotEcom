import { IinitiatePaymentRequestPayload, IinitiatePaymentResponse } from "../../types/payment"
import { requestConfigWithAuthToken } from "../axiosConfig"
import Axios from "../axiosInstance"

export const initiatePayment = async(payload:IinitiatePaymentRequestPayload)=>{
    const {data} = await Axios.post<IinitiatePaymentResponse>("/payment/initiate",payload,requestConfigWithAuthToken);

    return data;
}
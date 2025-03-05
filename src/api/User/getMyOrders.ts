import { OrderedItem } from "../../types/payment";
import { requestConfigWithAuthToken } from "../axiosConfig";
import Axios from "../axiosInstance";

export interface IOrder{
    _id:string;
    status:"processing"|"delivered"|"shipped";
    total:number;
    orderedItems:OrderedItem[];
    createdAt:Date
}

export interface myOrderResponse {
    success:true,
    orders:IOrder[]
}

export const getMyOrders = async()=>{
    const {data} = await Axios.get<myOrderResponse>("/order/my-orders",requestConfigWithAuthToken);
    return data;
}
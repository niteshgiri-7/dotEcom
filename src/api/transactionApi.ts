import { TransactionResponse } from "../types/transaction"
import Axios from "./axiosInstance";


export const getAllTransactions = async()=>{
    const {data}:{data:TransactionResponse} = await Axios.get("/order/admin/all-orders");
    return data;
}
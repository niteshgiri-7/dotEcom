import { TransactionResponse } from "../../types/transaction"
import { requestConfigWithAuthToken } from "./../axiosConfig";
import Axios from "./../axiosInstance";


export const getAllTransactions = async()=>{
    const {data}:{data:TransactionResponse} = await Axios.get("/order/admin/all-orders",requestConfigWithAuthToken);
    return data;
}
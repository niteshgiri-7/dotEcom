import { CustomerApiResponse } from "../../types/customer";
import Axios from "./../axiosInstance";

export const getAllCustomers = async()=>{

    const {data}:{data:CustomerApiResponse}= await Axios.get("/user/get-all");
    return data;
}
import { CustomerApiResponse } from "../../types/customer";
import { getToken } from "../../utils/getToken";
import Axios from "./../axiosInstance";

export const getAllCustomers = async()=>{

    const {data}:{data:CustomerApiResponse}= await Axios.get("/user/get-all",{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    });
    return data;
}
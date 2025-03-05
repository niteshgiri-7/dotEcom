import { requestConfigWithAuthToken } from "../axiosConfig";
import Axios from "../axiosInstance"

const deleteOrder = async(id:string)=>{
    const {data} = await Axios.delete(`/order/cancel/${id}`,requestConfigWithAuthToken);
    return data;
}

export default deleteOrder;
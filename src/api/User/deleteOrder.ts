
import Axios from "../axiosInstance"

const deleteOrder = async(id:string)=>{
    const {data} = await Axios.delete(`/order/cancel/${id}`);
    return data;
}

export default deleteOrder;
import toast from "react-hot-toast";
import Axios from "../axiosInstance";

export interface IProcessOrderResponse {
  success: true;
  message: string;
  status: "shipped" | "processing" | "delivered";
}

export const processOrder = async ({id,status}:{id:number,status:string}) => {
  if (status === "delivered") {
    toast.success("Order already delivered");
    return null;
  }
  const { data } = await Axios.patch<IProcessOrderResponse>(
    `/order/update-status/${id}`
  );
  return data;
};

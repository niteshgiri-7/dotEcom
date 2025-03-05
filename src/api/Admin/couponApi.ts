import { ICoupon, CouponResponse, CreateCouponResponse } from "../../types/coupon";
import { requestConfigWithAuthToken } from "./../axiosConfig";
import Axios from "./../axiosInstance";

export const getAllCoupons = async () => {
  const { data }: { data: CouponResponse } = await Axios.get(
    "/coupon/get-all",
    requestConfigWithAuthToken
  );
  return data;
};

export const createNewCoupon = async(values:ICoupon)=>{
  console.log("calling create coupon api")
  console.log(values)
  const {data}:{data:CreateCouponResponse} = await Axios.post("/coupon/create-new",values,requestConfigWithAuthToken);
  return data;
}

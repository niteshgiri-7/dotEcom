import { ICoupon, CouponResponse, CreateCouponResponse } from "../types/coupon";
import Axios from "./axiosInstance";

export const getAllCoupons = async () => {
  const { data }: { data: CouponResponse } = await Axios.get(
    "/payment/get-all-coupons"
  );
  return data;
};

export const createNewCoupon = async(values:ICoupon)=>{
  console.log("calling create coupon api")
  console.log(values)
  const {data}:{data:CreateCouponResponse} = await Axios.post("/payment/coupon/create-new",values);
  return data;
}

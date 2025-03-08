import {
  CouponResponse,
  CreateCouponResponse,
  ICoupon,
} from "../../types/coupon";
import Axios from "./../axiosInstance";

export const getAllCoupons = async () => {
  const { data }: { data: CouponResponse } = await Axios.get("/coupon/get-all");
  return data;
};

export const createNewCoupon = async (values: ICoupon) => {
  const { data }: { data: CreateCouponResponse } = await Axios.post(
    "/coupon/create-new",
    values
  );
  return data;
};

import { TCartItem } from "../redux/cartSlice";


export interface ShippingInfo{
    state:string;
    city:string;
    pinCode:number;
    country:string;
}

export interface OrderedItem{
    name:string;
    photo:string;
    quantity:number;
    price:number;
    productId:string;
}

export interface IinitiatePaymentRequestPayload {
    shippingInfo:ShippingInfo;
    orderedItems:TCartItem[]
    couponCode?:string;
    total:number;
  }

export interface IinitiatePaymentResponse{
    paymentUrl:string;
    pidx:string;
    purchaseId:string;
}


export interface IPaymentVerificationResponse {
    success: boolean;
    data: {
      pidx: string;
      total_amount: number;
      status: string;
      transaction_id?: string;
    };
  }
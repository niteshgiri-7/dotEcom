import { ShippingInfo } from "./transaction";

export interface ICheckOutFormValues extends ShippingInfo{
    city:string;
    state:string;
    pinCode:number;
    country:string;
    couponCode?:string;
}
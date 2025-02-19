
export interface ICoupon{
    code:string;
    discountedAmount:number|string;
    _id?:string|number;
    expiresAt:Date|string;
    maxRedemptionCount:number|string;
    availableRedemptionCount?:number|string;
}

export interface CouponResponse{
    success:boolean;
    coupons:ICoupon[];
}


export interface CreateCouponResponse{
    success:boolean;
    message:string;
    newCoupon:ICoupon;
}
//transaction basically refers to orders

export interface ShippingInfo{
    state:string;
    city:string;
    pinCode:string;
    country:string;
}

export interface OrderedItem{
    name:string;
    photo:string;
    quantity:number;
    price:number;
    productId:string;
}

export interface Transaction{
    _id:string|number;
    shippingInfo:ShippingInfo;
    status:"pending payment"|"processing"|"delivered"|"shipped";
    orderedBy:{
        _id:string;
        name:string;
    };
    deliveryCharge:number;
    discount:number;
    total:number;
    orderedItems:OrderedItem[];
}


export interface TransactionResponse{
    success:boolean;
    allOrders:Transaction[];
}
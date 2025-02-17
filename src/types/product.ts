
export interface Product {
    _id:string|number;
    name:string;
    photo:string;
    price:number;
    stock:number;
    category:string;
}

export interface ProductResponse{
    success:boolean;
    message?:string;
    Products?:Product[];
    productDetails?:Product;
}

export interface ProductFormData{
    _id?:string;
    name:string;
    price:string;
    stock:string;
    photo:File|string;
    category:string;
}

export interface Product {
    _id:string;
    name:string;
    photo:{
        secure_url:string;
    }
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
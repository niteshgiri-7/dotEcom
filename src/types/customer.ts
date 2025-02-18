
export interface CustomerData {
    _id:string|number;
    name:string;
    email:string;
    photo:string;
    gender:string;
}

export interface CustomerApiResponse {
    success:boolean;
    allCustomers:CustomerData[]
}
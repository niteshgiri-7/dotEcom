import { AxiosError } from "axios";
import { useEffect } from "react"
import toast from "react-hot-toast";



export const useErrorNotification = (isError:boolean,error:Error|null)=>{
     
    useEffect(()=>{
         if(isError && error){
            if(error instanceof AxiosError){
            let message = error.response?.data?.message as string || error.message || "Something went wrong";

            if(message.toLowerCase().includes("firebase"))
                message="Auth Failed";
            
            toast.error(message);
            console.log(message)
            console.log(error)
}
         }
    },[isError,error]);
};
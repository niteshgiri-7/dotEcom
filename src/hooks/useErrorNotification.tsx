import { useEffect } from "react"
import toast from "react-hot-toast";

export const useErrorNotification = (isError:boolean,error:Error|null,description:string|undefined)=>{
     
    useEffect(()=>{
         if(isError){
            toast.error(description as string);
            console.log(error?.message,"hello")
            console.log(error)
         }
    },[isError,description,error]);
};
import { useEffect } from "react"
import toast from "react-hot-toast";

export const useErrorNotification = (isError:boolean,error:Error|null,description:string|undefined)=>{
     
    useEffect(()=>{
         if(isError && error && description){
            toast.error(description);
            console.log(error.message)
         }
    },[isError,description,error]);
};
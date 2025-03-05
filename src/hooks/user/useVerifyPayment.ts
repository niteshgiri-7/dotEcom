import { useQuery } from "@tanstack/react-query";
import { verifyPayment } from "../../api/User/verifyPayment";


export const useVerifyPayment = () => {
  return useQuery({
    queryKey: ["verifyPayment"],
    queryFn: verifyPayment,
    retry: false,
  });
};

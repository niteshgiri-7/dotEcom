import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../api/customerApi";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["allCustomers"],
    queryFn: getAllCustomers,
  });
};

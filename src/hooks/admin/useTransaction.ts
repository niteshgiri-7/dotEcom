import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../api/Admin/transactionApi";

export const useTransaction = () => {
  return useQuery({
    queryKey: ["allTransactions"],
    queryFn: getAllTransactions,
  });
};

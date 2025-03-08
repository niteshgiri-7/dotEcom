import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { processOrder } from "../../api/Admin/processOrder";
import { TransactionResponse } from "../../types/transaction";

const useProcessOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: processOrder,
    onMutate: ({ id }) => {
      const prev: TransactionResponse | undefined = queryClient.getQueryData([
        "allTransactions",
      ]);

      const transactionBeforeUpdate = prev?.allOrders.find(
        (order) => order._id === id
      );

      let transactionStatus = transactionBeforeUpdate?.status;

      switch (transactionStatus) {
        case "processing":
          transactionStatus = "shipped";
          break;
        case "shipped":
          transactionStatus = "delivered";
          break;
      }

      const updateStatusOptimistically = (old: TransactionResponse) => {
        return {
          ...old,
          allOrders: old.allOrders.map((order) =>
            order._id === id ? { ...order, status: transactionStatus } : order
          ),
        };
      };

      queryClient.setQueryData(
        ["allTransactions"],
        (old: TransactionResponse) => updateStatusOptimistically(old)
      );

      return { prev };
    },
    onSuccess: (value) => {
        //axios returns null if the order status is already delivered(no api call happens)
      if(value===null) return;
      toast.success("Order processed Successfully");
    },

    onError: (error, _variables, context) => {
      queryClient.setQueryData(["allTransactions"], context?.prev);
      toast.error(error.message);
    },
  });
};

export default useProcessOrder;

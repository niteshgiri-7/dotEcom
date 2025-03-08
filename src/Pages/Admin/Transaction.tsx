import Loader from "../../Components/Loader";
import NavBar from "../../Components/admin/NavBar"
import TransactionTable from "../../Components/admin/TransactionTable"
import WowSuchEmpty from "../../Components/WowSuchEmpty";
import { useErrorNotification } from "../../hooks/useErrorNotification";
import { useTransaction } from "../../hooks/admin/useTransaction";
import useProcessOrder from "../../hooks/admin/useProcessOrder";
import { Toaster } from "react-hot-toast";

const Transaction = () => {
  const { data, error, isError, isPending } = useTransaction();
  const { mutate: processOrder, isError: isProcessingError, error: processError } = useProcessOrder();
  useErrorNotification(isError, error);
  useErrorNotification(isProcessingError, processError);

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <NavBar />
      {
        isPending ?
          <Loader />
          :
          data?.allOrders && data?.allOrders.length > 0 ?
            <main className="flex-[0.8] mx-auto my-10">
              <TransactionTable data={data.allOrders} processOrder={processOrder} />
            </main>
            :
            <WowSuchEmpty />

      }
      <Toaster position="top-center" />
    </div>
  )
};

export default Transaction;

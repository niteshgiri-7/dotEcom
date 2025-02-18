import Loader from "../Components/Loader";
import NavBar from "../Components/NavBar"
import TransactionTable from "../Components/TransactionTable"
import { useErrorNotification } from "../hooks/useErrorNotification";
import { useTransaction } from "../hooks/useTransaction";

const Transaction = () => {
  const { data, error, isError, isPending } = useTransaction();
  console.log(data)
  useErrorNotification(isError,error,error?.message)
  return (
    <div className="flex bg-gray-200 min-h-screen">
      <NavBar />
      {
        isPending || !data?
         <Loader /> 
         :
          <main className="flex-[0.8] mx-auto my-10">
            <TransactionTable data={data.allOrders} />
          </main>
      }
    </div>
  )
};

export default Transaction;

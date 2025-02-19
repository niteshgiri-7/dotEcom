import Loader from "../Components/Loader";
import NavBar from "../Components/NavBar"
import TransactionTable from "../Components/TransactionTable"
import WowSuchEmpty from "../Components/WowSuchEmpty";
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
        isPending ?
         <Loader /> 
         :
         data?.allOrders && data?.allOrders.length>0 ?
          <main className="flex-[0.8] mx-auto my-10">
            <TransactionTable data={data.allOrders} />
          </main>
          :
          <WowSuchEmpty/>

      }
    </div>
  )
};

export default Transaction;

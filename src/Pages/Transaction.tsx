import NavBar from "../Components/NavBar"
import TransactionTable from "../Components/TransactionTable"

const Transaction = () => {
  return (
    <div className="flex bg-gray-200 min-h-screen">
  <NavBar/>
  <main className="flex-[0.8] mx-auto my-10">
    <TransactionTable/>
  </main>
    </div>
  )
};

export default Transaction;

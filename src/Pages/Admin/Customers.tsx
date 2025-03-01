import CustomerTable from "../../Components/CustomerTable"
import Loader from "../../Components/Loader";
import NavBar from "../../Components/NavBar"
import WowSuchEmpty from "../../Components/WowSuchEmpty";
import { useCustomers } from "../../hooks/useCustomer"
import { useErrorNotification } from "../../hooks/useErrorNotification";

const Customers = () => {

  const { data, isPending, isError, error } = useCustomers();
  useErrorNotification(isError, error, error?.message)

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <NavBar />
      {
        isPending  ?
          <Loader />
          :
           data?.allCustomers && data.allCustomers.length>0?
          <main className="flex-[0.8] mx-auto my-10">
            <CustomerTable data={data?.allCustomers} />
          </main>
          :
          <WowSuchEmpty/>
      }
    </div>
  )
}

export default Customers;

import CustomerTable from "../Components/CustomerTable"
import NavBar from "../Components/NavBar"

const Customers = () => {
  return (
    <div className="flex bg-gray-200 min-h-screen">
  <NavBar/>
  <main className="flex-[0.8] mx-auto my-10">
    <CustomerTable/>
  </main>
    </div>
  )
}

export default Customers;

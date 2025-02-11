import CustomerTable from "../Components/CustomerTable"
import NavBar from "../Components/NavBar"

const Customers = () => {
  return (
    <div className="flex bg-gray-200 min-h-screen min-w-screen">
      <NavBar />
      <main className="flex-1 max-w-fit mx-auto mt-10 p-1">
        <CustomerTable/>
      </main>
    </div>
  )
}

export default Customers;

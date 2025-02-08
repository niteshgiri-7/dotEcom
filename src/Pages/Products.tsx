import { IoAddCircle } from "react-icons/io5";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";



const Products = () => {

  return (
   <div className="flex min-h-screen  bg-gray-100">
    <div className="min-h-screen bg-white">
    <NavBar/>
    </div>
    <main className="flex-1 mx-auto my-10 select-none p-4">
      <div className=" flex flex-col gap-3">
      <button className="px-4 py-2 bg-[rgb(10,150,255)] hover:bg-opacity-80 rounded-lg font-bold self-end text-[rgba(255,255,255,0.8)] flex justify-center items-center gap-3">Add Product <IoAddCircle className="text-2xl"/></button>
      <ProductTable/>
      </div>
    </main>
   </div>
  )
}

export default Products;

import { IoAddCircle } from "react-icons/io5";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";
import { useState } from "react";
import AddProductForm from "../Components/ProductForm";



const Products = () => {
const [isFormOpen,setIsFormOpen] = useState<boolean>(false);
console.log(isFormOpen)
  return (
   <div className="flex min-h-screen  bg-gray-100 relative ">
    <div className="min-h-screen bg-white">
    <NavBar/>
    </div>
    <main className="flex-1 mx-auto my-10 select-none p-4 ">
      <div className="flex flex-col gap-3">
      <button className="btn-style" onClick={()=>setIsFormOpen(true)}>Add Product <IoAddCircle className="text-2xl" /></button>
      <ProductTable/>
      </div>
      {isFormOpen && <AddProductForm closeForm={()=>setIsFormOpen(false)}/>}
    </main>
   </div>
  )
}

export default Products;

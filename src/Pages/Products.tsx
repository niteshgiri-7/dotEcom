import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import Loader from "../Components/Loader";
import NavBar from "../Components/NavBar";
import AddProductForm from "../Components/ProductForm";
import ProductTable from "../Components/ProductTable";
import { useErrorNotification } from "../hooks/useErrorNotification";
import { useProducts } from "../hooks/useProduct";
import { Toaster } from "react-hot-toast";



const Products = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { productsArray, isError, error, isPending } = useProducts();
  useErrorNotification(isError, error, error?.message);


  return (
    <div className="flex min-h-screen  bg-gray-100 relative ">
      <div className="min-h-screen bg-white">
        <NavBar />
      </div>
      {
         isPending ? <Loader /> :

          <main className="flex-1 mx-auto my-10 select-none p-4 ">
            <div className="flex flex-col gap-3">
              <button className="btn-style" onClick={() => setIsFormOpen(true)}>Add Product <IoAddCircle className="text-2xl" /></button>
              <ProductTable data={productsArray} />
            </div>
            {isFormOpen && <AddProductForm closeForm={() => setIsFormOpen(false)} />}
          </main>
      }
      <Toaster position="top-center"/>
    </div>
  )
}

export default Products;

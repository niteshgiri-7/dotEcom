import { BiSolidLeftArrow } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import NavBar from "../Components/NavBar";
import ProductForm from "../Components/ProductForm";
import { useErrorNotification } from "../hooks/useErrorNotification";
import { useProductDetails } from "../hooks/useProduct";
import { Product, ProductResponse } from "../types/product";
import { BASEURL } from "../utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";

const ManageProduct = () => {

  const {id} = useParams();

  const queryClient = useQueryClient();

  const {data:cachedProductResponse,isError,isLoading,error} = useProductDetails(id!);
  
  const {mutate:deleteProduct,isPending:isDeletePending}=useDeleteProduct(id!);

  useErrorNotification(isError,error,error?.message);
  
  const prevProductApiResponse:ProductResponse|undefined = queryClient.getQueryData(["allProducts"]);
  
  const currentProduct:Product|undefined = prevProductApiResponse?.Products?.filter(p=>p._id===id)[0] || cachedProductResponse?.productDetails;


  return (
    <div className="flex">

      <NavBar />

      {
         isLoading
          ?
          <div className="flex-1 flex justify-center items-center">
            <Loader />
          </div>
          :
          <main className="p-4 bg-gray-200 min-h-screen w-screen flex flex-col gap-2 lg:flex-row justify-center items-center">

            <div className="bg-white flex flex-col rounded-lg shadow-lg shadow-gray-500 p-4 mt-5 max-w-sm min-h-fit lg:h-[520px] xl:h-[520px] lg:m-0 lg:p-[2rem]">
              
              <Link to="/admin/products">
                <BiSolidLeftArrow className="text-2xl cursor-pointer" />
              </Link>

              <h1 className="text-end text-green-500 mr-5"><strong>{currentProduct?.stock} Available</strong></h1>
              <img className="rounded-lg max-w-[90%] min-h-[50%] mx-auto" src={BASEURL + currentProduct?.photo} alt="product-photo" />
              <div className="lg:flex lg:flex-col flex-1 justify-end">
                <p className="text-center text-2xl ">{currentProduct?.name}</p>
                <p className="text-center text-4xl">$ {currentProduct?.price}</p>
                <button className="px-4 py-2 rounded-lg text-white font-bold  bg-red-600 w-full" onClick={()=>deleteProduct(id!)}>{isDeletePending?<ClipLoader size={30}/>:"Delete Product"}</button>
              </div>

            </div>

            <ProductForm product={currentProduct} id={id} />

          </main>
      }
      <Toaster position="top-center"/>
    </div>
  )
}

export default ManageProduct;

import { BiSolidLeftArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import ProductForm from "../Components/ProductForm";

const ManageProduct = () => {
  const data =
  {
    id: 1,
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 1",
    price: 29.99,
    stock: 50,
    category: "Mobile"
  };
  return (
    <div className="flex">
      <NavBar />
      <main className="p-8 bg-gray-200 min-h-screen w-screen flex flex-col gap-2 lg:flex-row justify-center items-center">
       
        <div className="flex flex-col gap-1 max-w-[80%] max-h-[60%] bg-white shadow-lg shadow-gray-500 rounded-lg p-4 ">
       <Link to="/admin/products">
       <BiSolidLeftArrow className="text-2xl cursor-pointer"/>
       </Link>   
          <h1 className="text-end text-green-500 mr-5"><strong>{data.stock} Available</strong></h1>
          <img className="rounded-lg max-w-[90%] mx-auto" src={data.photo} alt="product-photo" />
          <p className="text-center text-2xl">{data.name}</p>
          <p className="text-center text-4xl">$ {data.price}</p>
        </div>
          <ProductForm productToManage={data} />

      </main>
    </div>
  )
}

export default ManageProduct;

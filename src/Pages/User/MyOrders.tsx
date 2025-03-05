import { Toaster } from "react-hot-toast";
import Loader from "../../Components/Loader";
import OrderCards from "../../Components/user/OrderCards";

import { useErrorNotification } from "../../hooks/useErrorNotification";
import { useMyOrders } from "../../hooks/user/useMyOrders";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { data, isError, error, isLoading } = useMyOrders();
  console.log(data);
  useErrorNotification(isError, error);
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold md:ml-[15vw]">My Orders</h1>
      {
        isLoading ?
          <Loader />
          :
          data && data?.orders && data.orders.length > 0 ?
            <div className="flex flex-col justify-center items-center">
              {data.orders.map((order) => (
                <OrderCards key={order._id} order={order} />
              ))
              }
            </div>
            :
            <div className="w-full h-[50vh] flex flex-col justify-center items-center">

            <h1 className="font-bold text-2xl">You haven't placed any orders yet.</h1>
            <br/>
            <Link
            to="/home"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Continue Shopping
          </Link>
            </div>
      }
      <Toaster position="top-center"/>
    </div>
  )
}

export default MyOrders;

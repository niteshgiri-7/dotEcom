import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { IOrder } from "../../api/User/getMyOrders";
import { OrderedItem } from "../../types/payment";
import DeleteOrderDialouge from "./DeleteOrderDialouge";
import useDeleteOrder from "../../hooks/user/useDeleteOrder";



const statusColor = {
  processing: "text-yellow-600",
  shipped: "text-blue-600",
  delivered: "text-green-600"
}

const OrderCards = ({ order }: { order: IOrder }) => {

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showDeleteOrder,setShowDeleteOrder] = useState<boolean>(false);

  const {mutate:deleteOrder} = useDeleteOrder(order._id);

 const handleDeleteOrder=()=>{
  console.log("calling handleDeleteOrder")
  deleteOrder(order._id);
 }

  return (
    <div className="w-full md:w-3/4 bg-white shadow-lg shadow-gray-200  m-2 rounded-lg p-6">

      <div className="flex justify-between mb-3">

        <div>
          <p className="font-bold">Order# {order._id.toString().slice(0, 10)}...</p>
          <p className="text-gray-400 text-sm font-bold">Paced on {new Date(order.createdAt).toLocaleDateString("en-CA")}</p>
        </div>

        <div className="font-bold text-md">
          <p className="text-gray-600">Rs.{order.total}</p>
          <p className={`${statusColor[order.status]}`}>{order.status}</p>

        </div>
      </div>

      <div className="flex items-center justify-between  text-indigo-600 font-semibold">
        <div className="flex gap-1 items-center cursor-pointer" onClick={() => setShowDetails(prev => !prev)}>
          {
            showDetails ?
              (
                <>

                  <IoIosArrowDropup />
                  <button>Hide Details</button>
                </>
              )
              :
              <>
                <IoIosArrowDropdown />
                <button>View Details</button>

              </>
          }

        </div>
        {
          (order.status === "processing") &&
          <button className="text-red-600 font-serif text-md cursor-pointer" onClick={()=>setShowDeleteOrder(true)}>Cancel Order</button>
        }
      </div>
      {
        showDetails &&
        <>
          <hr></hr>
          <div className="m-2">
            <span className="font-semibold">Ordered Items</span>
            {
              order.orderedItems.map((order) =>
                <Item item={order} />
              )
            }
          </div>

        </>
      }
      {
        showDeleteOrder && <DeleteOrderDialouge showModal={setShowDeleteOrder} deleteOrder={handleDeleteOrder}/>
      }
    </div>

  )
};

export default OrderCards;

const Item = ({ item }: { item: OrderedItem }) => {

  return (
    <>
    <div className="flex justify-between p-2">
      <div>
        <p className="font-normal">{item.name}</p>
        <p className="font-semibold text-gray-500">Qty:{item.quantity}</p>
      </div>

      <div>
        <span className="font-semibold">Rs.{item.price}</span>
      </div>
    </div>
    <hr/>
    </>

  )
}




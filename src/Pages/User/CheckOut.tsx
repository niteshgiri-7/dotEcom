


import { useSelector } from "react-redux"
import CheckOutForm from "../../Components/user/CheckOutForm"
import { useErrorNotification } from "../../hooks/useErrorNotification"
import { RootState } from "../../redux/store"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { TCartItem } from "../../redux/cartSlice"
import { useEffect } from "react"
import { usePayWithKhalti } from "../../hooks/user/usePayWithKhalti"




 const CheckoutPage=()=> {

  const navigate = useNavigate();
  const {mutate:initiatePayment,isError,error,isPending} = usePayWithKhalti();
  useErrorNotification(isError,error);

  const items = useSelector((store:RootState)=>store.cart.cartItems);

  let cartItems: TCartItem[];

  if(items.length===0)
    cartItems = JSON.parse(localStorage.getItem("cartItems")as string);
  else
  cartItems = items;
   
   useEffect(() => {
     console.log(cartItems)
    if (!cartItems) {
      navigate("/home", { replace: true });
    }
  }, [cartItems,navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10.0;
  const total = subtotal + shipping;



  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
    
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <ul className="divide-y divide-gray-200 mb-4">
                {cartItems.map((item) => (
                  <li key={item._id} className="py-3 flex justify-between">
                    <div>
                      <p className="text-sm text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900">${shipping.toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <p className="text-gray-900">Total</p>
                    <p className="text-gray-900">${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>
                  Your personal data will be used to process your order, support your experience, and for other purposes
                  described in our privacy policy.
                </p>
              </div>
            </div>
          </div>

          <CheckOutForm initiatePayment={initiatePayment} cartItems={cartItems} total={total} isLoading={isPending}/>

  
         
        </div>
        <Toaster position="top-center"/>
      </main>
    </div>
  )
}
export default CheckoutPage;

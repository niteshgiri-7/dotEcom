import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTable from "../../Components/user/CartTable";
import { AppDispatch, RootState } from "../../redux/store";
import { addItemsFromLocalStorage, clearCart, TCartItem } from "../../redux/cartSlice";

const getCartItemsFromLocalStorage = ()=>{
  return JSON.parse(localStorage.getItem("cartItems")as string)
}

const CartPage = () => {
  
    const itemsInStore = useSelector((store:RootState)=>store.cart.cartItems)

    const dispatch = useDispatch<AppDispatch>();
 
    let cartItems:TCartItem[] = itemsInStore; 

    if(itemsInStore?.length===0){
      cartItems =getCartItemsFromLocalStorage();
      if(cartItems && cartItems.length>0)
      dispatch(addItemsFromLocalStorage(cartItems)); 
    }

  const subtotal = cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 10.0;
  const total = subtotal + shipping;

  const handleClearCart =()=>{
    dispatch(clearCart(undefined));
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex gap-2  items-center"><BiCart className="w-6 h-6" />Cart</h1>

      { cartItems && cartItems?.length > 0 ? (
        <>
          <CartTable cartItems={cartItems} />

          <button className="p-2 bg-red-600 rounded-lg font-bold text-white flex justify-center items-center ml-auto mb-2" onClick={handleClearCart}>Clear Cart</button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-lg font-semibold text-blue-600">${total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center px-4 py-2 rounded-md transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            to="/home"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
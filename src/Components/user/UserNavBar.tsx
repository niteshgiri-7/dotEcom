
import { ArrowDown, ArrowUp, LogOut } from 'lucide-react'
import { useState } from 'react'
import { BiCart, BiStore } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLogOut } from '../../hooks/useLogOut'
import { RootState } from '../../redux/store'

const UserNavBar = () => {

  const [showLogOut, setShowLogOut] = useState<boolean>(false);
  const {handleLogOut}=useLogOut();

  const cartItemsLength = useSelector((state: RootState) => state.cart.cartItems.length);
  let noOfCartItiems:number=0;

  if(cartItemsLength===0){
    const cartItems = JSON.parse(localStorage.getItem("cartItems")as string);
    noOfCartItiems = cartItems?.length ||0;
  }else
  noOfCartItiems=cartItemsLength;
 
  const handleShowLogOut = ()=>{
    setShowLogOut(prev=>!prev)
  }


  return (
    <header>
      <div className="w-full  flex items-center px-8 py-4 text-gray-600 bg-white">
        <BiStore className="text-4xl text-blue-500" />
        <nav className="flex-1 flex justify-end items-center gap-4 ml-auto font-semibold">
          <Link to="/home" className="hover:bg-indigo-600 hover:text-white px-4 py-1 rounded-md">Home</Link>
          <div className="hover:bg-indigo-600 hover:text-white px-4 py-1 rounded-md  relative p-2">
            <Link to="/cart" >
              <BiCart className="text-2xl" />
              <div className="w-5 h-5 absolute -top-1 right-0 text-sm text-white  font-extrabold bg-red-600 rounded-full flex justify-center">
              <span >{noOfCartItiems}</span>
              </div>
            </Link>
          </div>
          <Link to="/my-orders" className="hover:bg-indigo-600 hover:text-white px-4 py-1 rounded-md">Orders</Link>
          <div onClick={handleShowLogOut} className="cursor-pointer relative">

            <FaUser className="text-xl self-center" />
            {showLogOut ? <ArrowUp className="absolute top-0 -right-5" /> : <ArrowDown className="absolute top-0 -right-5" />}
          </div>
          {showLogOut &&
            <div className="absolute top-14 right-2 bg-gray-600 rounded-lg text-white h-[2rem] p-2 flex items-center justify-center font-semibold hover:bg-gray-800">
              <LogOut />
              <button onClick={handleLogOut} >LogOut</button>
            </div>
          }
        </nav>
      </div>
    </header>
  )
}

export default UserNavBar;

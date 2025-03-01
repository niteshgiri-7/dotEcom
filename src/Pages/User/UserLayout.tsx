import { BiCart, BiStore } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { Outlet,Link} from "react-router-dom";
const UserLayout = () => {
  return (
    <div>
        <header>
            <div className="w-full bg-white flex items-center px-8 py-4 text-gray-700">
            <BiStore className="text-4xl text-blue-500"/>
            <nav className="flex justify-between items-center gap-4 ml-auto font-semibold">
                <Link to="/home" className="hover:bg-gray-700 hover:text-white px-4 py-1 rounded-md">Home</Link>
                <div className="hover:bg-gray-700 hover:text-white px-4 py-1 rounded-md  relative p-2">
                <Link to="/cart" >
                <BiCart className="text-2xl"/>
                <span className="absolute -top-0 right-2 text-sm">0</span>
                </Link>
                </div>
                <FaUser className="text-2xl"/>
            </nav>
            </div>
        </header>
        <main className="min-h-[calc(100vh-150px)]">
      <Outlet/>
        </main>
        <footer>
            <div className="w-full h-32 bg-gray-100 flex flex-col justify-center items-center px-8 py-4 text-gray-700">
                <p>&copy; {new Date().getFullYear()} All rights reserved</p>
                <p className="text-sm">Made with ❤️ by <Link to="https://github.com/niteshgiri-7" className="text-blue-500">Nitesh Giri</Link></p>
            </div>
        </footer>
    </div>
  )
}

export default UserLayout

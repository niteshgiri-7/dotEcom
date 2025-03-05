import { Link, Outlet } from "react-router-dom";
import UserNavBar from "../../Components/user/UserNavBar";
const UserLayout = () => {
  return (
    <div>
        <UserNavBar/>
        <main className="min-h-[calc(100vh-150px)] bg-gray-100">
      <Outlet/>
        </main>
        <footer>
        <hr className="w-full h-[0.1rem] bg-gray-500"></hr>
            <div className="w-full h-32 bg-white flex flex-col justify-center items-center px-8 py-4 text-gray-700">
                <p>&copy; {new Date().getFullYear()} All rights reserved</p>
                <p className="text-sm">Made with ❤️ by <Link to="https://github.com/niteshgiri-7" className="text-blue-500">Nitesh Giri</Link></p>
            </div>
        </footer>
    </div>
  )
}

export default UserLayout

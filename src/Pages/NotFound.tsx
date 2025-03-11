import { Link } from "react-router-dom";
import WowSuchEmpty from "../Components/WowSuchEmpty";


const NotFound = () => {

  return (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-center bg-gray-300 gap-3">
        <h2 className="text-5xl text-center">Page Not Found</h2>
       <WowSuchEmpty/>
       <Link to="/login" className="text-3xl bg-gray-800 text-white rounded-md px-4 py-2">Guide Me</Link>
    </div>
  )
}

export default NotFound;

import { useState } from "react";
import { IconType } from "react-icons";
import { AiFillProduct } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { PiFileDashedBold } from "react-icons/pi";
import { RiUserLocationFill } from "react-icons/ri";
import { TbTransactionDollar } from "react-icons/tb";
import { Link, Location, useLocation } from "react-router-dom";


interface listItemsType {
    url: string;
    location: Location;
    text: string;
    icon: IconType;
}

const NavBar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const location = useLocation();

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const listItems: listItemsType[] = [
        {
            text: "Dashboard",
            icon: PiFileDashedBold,
            url: "/admin/dashboard",
            location: location,
        },
        {
            text: "Product",
            icon: AiFillProduct,
            url: "/admin/products",
            location: location,
        },
        {
            text: "Customer",
            icon: RiUserLocationFill,
            url: "/admin/customers",
            location: location,
        },
        {
            text: "Transaction",
            icon: TbTransactionDollar,
            url: "/admin/transactions",
            location: location,
        },
    ];
    return (
        <aside>
            <button className={`absolute ${isOpen ? "translate-x-32"  : "-translate-x-0"} duration-300 ease-in-out md:hidden z-30 font-bold text-3xl  inline-block`} onClick={handleToggle}>{isOpen ? <IoClose/> : <HiMenu/>}
            </button>
            <nav className={`fixed md:static bg-white h-screen w-fit lg:min-w-[20vw] ${!isOpen ? "-translate-x-full" : "translate-x-0"} transition-transform duration-300 ease-in-out md:translate-x-0 z-20 p-2 md:p-4 font-bold text-lg lg:text-xl`}>
                
                    <h1 className="mt-4 text-2xl md:text-4xl">Logo</h1>
                    <ul>
                        {listItems.map((item, idx) => (
                            <Link to={item.url} key={idx}>
                                <li className={`flex gap-2 px-2 py-2 items-center mt-2 md:mt-4 ${location.pathname.includes(item.url)?"bg-blue-400 bg-opacity-20  border rounded-md":""} text-[rgba(0,0,0,0.8)]`}>
                                    {<item.icon />}
                                    <span>{item.text}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
            </nav>
            {isOpen && <div className='h-screen w-screen fixed z-10 bg-black bg-opacity-50 backdrop-filter blur-sm' onClick={handleToggle}>

            </div>
            }
        </aside>
    )
}

export default NavBar

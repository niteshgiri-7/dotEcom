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

const SideBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();

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

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className={`absolute top-0 ${isOpen ? "translate-x-40 duration-300" : "left-0"
                    } font-bold text-4xl md:hidden z-40`}
                onClick={toggleSidebar}
            >
                {isOpen ? <IoClose /> : <HiMenu />}
            </button>

            <aside className={`fixed top-0 left-0 z-30 md:static`}>
                <nav
                    className={`bg-[rgba(233,233,233,1)] h-screen p-4 xl:p-8 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0 md:relative`}
                >
                    <h1 className="font-bold text-3xl">Logo</h1>
                    <div>
                        <ul className="mt-5">
                            {listItems.map((item) => (
                                <Link to={item.url} key={item.text}>
                                    <li
                                        className={`px-4 py-2 flex items-center gap-4 text-lg font-bold text-gray-700 mt-8 ${location.pathname === item.url
                                            ? "bg-gray-300"
                                            : "bg-transparent"
                                            } rounded-lg`}
                                    >
                                        {<item.icon />}
                                        <span>{item.text}</span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </nav>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default SideBar;

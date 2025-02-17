import { useState } from "react";
import { IconType } from "react-icons";
import { AiFillProduct } from "react-icons/ai";
import { BiBarChart, BiCoin, BiLineChart, BiPieChart, BiStopwatch } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { PiFileDashedBold } from "react-icons/pi";
import { RiCouponFill, RiUserLocationFill } from "react-icons/ri";
import { TbTransactionDollar } from "react-icons/tb";
import NavItems from "./NavItems";


export interface NavItemsType {
    url: string;
    text: string;
    icon: IconType;
}

//TODO: show toast after tossing the coin

const NavBar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);


    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const dashboardItems: NavItemsType[] = [
        {
            text: "Dashboard",
            icon: PiFileDashedBold,
            url: "/admin/dashboard",
        },
        {
            text: "Product",
            icon: AiFillProduct,
            url: "/admin/products",
        },
        {
            text: "Customer",
            icon: RiUserLocationFill,
            url: "/admin/customers",
        },
        {
            text: "Transaction",
            icon: TbTransactionDollar,
            url: "/admin/transactions",
        },
    ];

    const chartItems: NavItemsType[] = [
        {
            icon: BiBarChart,
            url: "/admin/bar-chart",
            text: "Bar",
        },
        {
            icon: BiPieChart,
            url: "/admin/pie-chart",
            text: "Pie",
        },
        {
            icon: BiLineChart,
            url: "/admin/line-chart",
            text: "Line",
        },
    ]

    const utilItems: NavItemsType[] = [
        {
            icon: RiCouponFill,
            url: "/admin/coupon",
            text: "Coupon",
        },
        {
            icon: BiCoin,
            url: "/admin/toss",
            text: "Toss",
        },
        {
            icon:BiStopwatch,
            url:"/admin/stop-watch",
            text:"StopWatch",
       },
    ]
    return (
        <aside >
            <button className={`absolute ${isOpen ? "translate-x-48" : "-translate-x-0"} duration-300 ease-in-out md:hidden z-30 font-bold text-3xl  inline-block`} onClick={handleToggle}>{isOpen ? <IoClose /> : <HiMenu />}
            </button>
            <nav className={`fixed md:static bg-white h-screen w-[14rem] md:w-fit lg:min-w-[20vw] ${!isOpen ? "-translate-x-full" : "translate-x-0"} transition-transform duration-300 ease-in-out md:translate-x-0 z-20 p-2 md:p-4 font-bold text-lg lg:text-xl`}>

                <h1 className="mt-4 text-2xl md:text-4xl">Logo</h1>

               <NavItems navItem={dashboardItems} name="Dashboard"/>

                <NavItems navItem={chartItems} name="Charts"/>

              <NavItems navItem={utilItems} name="Utils"/>

            </nav>
            {isOpen && <div className='min-h-screen w-screen fixed z-10 bg-black bg-opacity-50 backdrop-filter blur-sm' onClick={handleToggle}>

            </div>
            }
        </aside>
    )
}

export default NavBar

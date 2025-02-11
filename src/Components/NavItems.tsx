
import { Link, useLocation } from 'react-router-dom'
import { NavItemsType } from './NavBar'

const NavItems = ({navItem}:{navItem:NavItemsType[]}) => {
   const currentLocation = useLocation();
  return (
    <div className="mt-3">
    <p className="text-lg text-gray-500">Dashboard</p>
    <ul>
        {navItem.map((item, idx) => (
            <Link to={item.url} key={idx}>
                <li className={`flex gap-2 px-2 py-2 items-center mt-2 md:mt-4 ${currentLocation.pathname.includes(item.url) ? "bg-blue-400 bg-opacity-20  border rounded-md" : ""} text-[rgba(0,0,0,0.8)]`}>
                    {<item.icon />}
                    <span>{item.text}</span>
                </li>
            </Link>
        ))}
    </ul>
</div>
  )
}

export default NavItems;

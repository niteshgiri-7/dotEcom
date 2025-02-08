import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import TableHOC from "./TableHOC";

type Product = {
  photo:string;
  name:string;
  price:number;
  stock:number;
  action:string;
};


const data: Product[] = [
  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 1",
    price: 29.99,
    stock: 50,
    action: "Manage",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",

    name: "Product 2",
    price: 49.99,
    stock: 30,
    action: "Manage",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",

    name: "Product 3",
    price: 19.99,
    stock: 100,
    action: "Manage",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",

    name: "Product 4",
    price: 99.99,
    stock: 20,
    action: "Manage",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",

    name: "Product 5",
    price: 59.99,
    stock: 10,
    action: "Manage",
  },  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 1",
    price: 29.99,
    stock: 50,
    action: "Manage",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",

    name: "Product 2",
    price: 49.99,
    stock: 30,
    action: "Manage",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",

    name: "Product 3",
    price: 19.99,
    stock: 100,
    action: "Manage",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",

    name: "Product 4",
    price: 99.99,
    stock: 20,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 5",
    price: 59.99,
    stock: 10,
    action: "Manage",
  },  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 1",
    price: 29.99,
    stock: 50,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 2",
    price: 49.99,
    stock: 30,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 3",
    price: 19.99,
    stock: 100,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 4",
    price: 99.99,
    stock: 20,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 5",
    price: 59.99,
    stock: 10,
    action: "Manage",
  },  {
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 1",
    price: 29.99,
    stock: 50,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 2",
    price: 49.99,
    stock: 30,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 3",
    price: 19.99,
    stock: 100,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 4",
    price: 99.99,
    stock: 20,
    action: "Manage",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Product 5",
    price: 59.99,
    stock: 10,
    action: "Manage",
  },
];


const ProductTable = () => {

const columns = useMemo<ColumnDef<Product,string>[]>(()=>[
  {
    accessorKey:'photo',
    header:'Photo',
    cell:(info)=><img className="max-h-[50px] md:max-h-[70px]  mx-auto rounded-lg" src={info.getValue()} />,
    enableSorting:false,

  },
  {
    accessorKey:'name',
    header:'Name',
    cell:(info)=>info.getValue()
  },
  {
    accessorKey:'price',
    header:'Price',
    cell:(info)=>info.getValue()
  },
  {
    accessorKey:'stock',
    header:'Stock',
    cell:(info)=>info.getValue()
  },
  {
    accessorKey:'action',
    header:'Action',
    cell:(info)=><span className="bg-[rgb(10,150,255)] p-1 lg:p-2 rounded-lg text-[rgba(255,255,255,0.8)] cursor-pointer hover:bg-opacity-80">{info.getValue()}</span>,
    enableSorting:false,
  },
],
[])

  return (
    TableHOC<Product,string>(columns,data,"Products",true)()
    
  )
}

export default ProductTable;

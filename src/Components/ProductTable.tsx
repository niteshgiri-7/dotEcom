import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import TableHOC from "./TableHOC";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  photo: string;
  name: string;
  price: number;
  stock: number;
};

const data: Product[] = [
  {
    id: 1,
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 1",
    price: 29.99,
    stock: 50,
  },
  {
    id: 2,
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 2",
    price: 49.99,
    stock: 30,
  },
  {
    id: 3,
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 3",
    price: 19.99,
    stock: 100,
  },
  {
    id: 4,
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 4",
    price: 99.99,
    stock: 20,
  },
  {
    id: 5,
    photo: "https://via.placeholder.com/150",
    name: "Product 5",
    price: 59.99,
    stock: 10,
  },
  {
    id: 6,
    photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
    name: "Product 6",
    price: 29.99,
    stock: 50,
  },
  {
    id: 7,
    photo: "https://via.placeholder.com/150",
    name: "Product 7",
    price: 49.99,
    stock: 30,
  },
  {
    id: 8,
    photo: "https://via.placeholder.com/150",
    name: "Product 8",
    price: 19.99,
    stock: 100,
  },
  {
    id: 9,
    photo: "https://via.placeholder.com/150",
    name: "Product 9",
    price: 99.99,
    stock: 20,
  },
  {
    id: 10,
    photo: "https://via.placeholder.com/150",
    name: "Product 10",
    price: 59.99,
    stock: 10,
  },
];




const ProductTable = () => {

const navigate = useNavigate();

const handleManage = useCallback((id:number)=>{
navigate(`/admin/products/${id}`);
},
[navigate]
)

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
    cell:({row})=><button className="bg-[rgb(10,150,255)] p-1 lg:p-2 rounded-lg text-[rgba(255,255,255,0.8)] cursor-pointer hover:bg-opacity-80" onClick={()=>handleManage(row.original.id)}>Manage</button>,
    enableSorting:false,
  },
],
[handleManage]
);

  return (
    TableHOC<Product,string>(columns,data,"Products",true)()
  );
}

export default ProductTable;

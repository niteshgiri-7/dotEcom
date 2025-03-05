import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/product";
import TableHOC from "./TableHOC";



const ProductTable = ({data}:{data:Product[]}) => {



const navigate = useNavigate();

const handleManage = useCallback((id:number|string)=>{
navigate(`/admin/products/${id}`);
},
[navigate]
)

const columns = useMemo<ColumnDef<Product,string>[]>(()=>[
  {
    accessorKey:'photo.secure_url',
    header:'Photo',
    cell:(info)=><img className="max-h-[50px] md:max-h-[70px]  mx-auto rounded-lg" src={`${info.getValue()}`}/>,
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
    cell:({row})=><button className="bg-[rgb(10,150,255)] p-1 lg:p-2 rounded-lg text-[rgba(255,255,255,0.8)] cursor-pointer hover:bg-opacity-80" onClick={()=>handleManage(row.original._id)}>Manage</button>,
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

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import TableHOC from "./TableHOC";

interface TransactionDataType {
    user:string;
    amount:number;
    discount:number;
    quantity:number;
    Status:"Pending"|"Delivered"|"Shipped"|"Cancelled"|"Processing";
}

const transactions: TransactionDataType[] = [
  { user: "John Doe", amount: 150, discount: 10, quantity: 2, Status: "Delivered" },
  { user: "Jane Smith", amount: 200, discount: 20, quantity: 1, Status: "Pending" },
  { user: "Alice Johnson", amount: 350, discount: 15, quantity: 3, Status: "Delivered" },
  { user: "Bob Williams", amount: 120, discount: 5, quantity: 1, Status: "Cancelled" },
  { user: "Emily Davis", amount: 500, discount: 50, quantity: 5, Status: "Delivered" },
  { user: "Michael Brown", amount: 80, discount: 0, quantity: 1, Status: "Processing" },
  { user: "Sophia Wilson", amount: 600, discount: 60, quantity: 6, Status: "Shipped" },
  { user: "David Martinez", amount: 250, discount: 25, quantity: 2, Status: "Cancelled" },
  { user: "Olivia Anderson", amount: 100, discount: 10, quantity: 1, Status: "Pending" },
  { user: "James Taylor", amount: 400, discount: 30, quantity: 4, Status: "Shipped" },
];

const TransactionTable = ()=>{

    const columns = useMemo<ColumnDef<TransactionDataType,string>[]>(()=>[
        {
            accessorKey:'user',
            header:'User',
            cell:(info)=>info.getValue()
        },
        {
            accessorKey:'amount',
            header:'Amount',
            cell:(info)=>info.getValue()
        },
        {
            accessorKey:'discount',
            header:'Discount',
            cell:(info)=>info.getValue()
        },
        {
            accessorKey:'quantity',
            header:'Quantity',
            cell:(info)=>info.getValue()
        },
        {
            accessorKey:'Status',
            header:'Status',
            cell:(info)=><span className="font-medium text-gray-800">{info.getValue()}</span>
        }
    ],
    []
);
return(
    TableHOC(columns,transactions,"Transactions",true)()
)
};

export default TransactionTable;
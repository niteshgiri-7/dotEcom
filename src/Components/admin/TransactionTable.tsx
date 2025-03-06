import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { OrderedItem, Transaction } from "../../types/transaction";
import TableHOC from "./TableHOC";



const TransactionTable = ({data}:{data:Transaction[]})=>{

    const columns = useMemo<ColumnDef<Transaction,string>[]>(()=>[
        {
            accessorKey:'orderedBy.name',
            header:'User',
            cell:(info)=>info.getValue()
        },
        {
            accessorKey:'shippingInfo.city',
            header:'Address',
            cell:(info)=>info.getValue()
        },
        {
            accessorFn:(row)=>row.orderedItems.reduce((sum:number,item:OrderedItem)=>sum+item.quantity,0),
            header:'Quantity',
            cell:(info)=><i>{info.getValue()}</i>
        },
        {    
             accessorKey:"total",
             header:'Total',
             cell:(info)=><>Rs.{info.getValue()}</>
        },
        {
            accessorKey:'status',
            header:'Status',
            cell:(info)=><span className="font-bold  text-gray-800">{info.getValue()}</span>
        }
    ],
    []
);
return(
    TableHOC(columns,data,"Transactions",data.length>8?true:false)()
)
};

export default TransactionTable;
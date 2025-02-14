import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import TableHOC from './TableHOC';
import { TransactionType } from '../types/dashboard';



const DashboardTable = ({data}:{data:TransactionType[]}) => {
  
   const modifiedTableData = data.map(d=>d.status==="pending payment"?{...d,status:"pending"}:d); // shortening and to match the cell value to give semantic color for status

  const columns = useMemo<ColumnDef<TransactionType, string>[]>(
    () => [
      {
        accessorKey: '_id',
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: "total",
        cell: (info) => info.getValue(),
        header:()=>"Total"
      },
      {
        accessorKey: "discount",
        cell: (info) => info.getValue(),
        header:()=>"Discount"
      },
      {
        accessorKey: "quantity",
        cell: (info) => info.getValue(),
        header:()=>"Quantity"
      },
      {
        accessorKey: "status",
        cell: (info) => info.getValue(),
        header:()=>"Status"
      }
    ],
    []
  );


  return (
    TableHOC<TransactionType, string>(columns, modifiedTableData, "LATEST TRANSACTION")()
    // data being passed is of type transaction <T>, ani string means cell value is string <U>
  )
}

export default DashboardTable;

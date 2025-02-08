import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import TableHOC from './TableHOC';

type Transaction = {
    Id: string;
    Quantity: number;
    Discount: number;
    Amount: number;
    Status: string;
  }
  
  const data: Transaction[] = [
    {
      Id: "fadksfasf",
      Quantity: 10,
      Discount: 200,
      Amount: 9999,
      Status: "Pending"
    },
    {
      Id: "fadksfasf",
      Quantity: 20,
      Discount: 200,
      Amount: 9999,
      Status: "Cancelled"
    },
    {
      Id: "fadksfasf",
      Quantity: 30,
      Discount: 200,
      Amount: 9999,
      Status: "Delivered"
    },
    {
      Id: "fadksfasf",
      Quantity: 40,
      Discount: 200,
      Amount: 9999,
      Status: "Shipped"
    },
    {
      Id: "fadksfasf",
      Quantity: 40,
      Discount: 200,
      Amount: 9999,
      Status: "Shipped"
    },
  
  ]

const DashboardTable = () => {

    const columns = useMemo<ColumnDef<Transaction,string>[]>(
        () => [
          {
            accessorKey: 'Id',
            cell: (info) => info.getValue(),
          },
        {
            accessorKey:"Amount",
            cell:(info)=>info.getValue(),
        },
        {
            accessorKey:"Discount",
            cell:(info)=>info.getValue(),
        },
        {
            accessorKey:"Quantity",
            cell:(info)=>info.getValue()
        },
        {
            accessorKey:"Status",
            cell:(info)=>info.getValue()
        }
        ],
        []
      );
      
      
  return (
    TableHOC(columns,data,"TOP TRANSACTION")()
  )
}

export default DashboardTable

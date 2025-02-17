import { ColumnDef } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
import TableHOC from './TableHOC';
import { TransactionType } from '../types/dashboard';



const DashboardTable = memo(({ data }: { data: TransactionType[] }) => {

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
        header: () => "Total"
      },
      {
        accessorKey: "discount",
        cell: (info) => info.getValue(),
        header: () => "Discount"
      },
      {
        accessorKey: "quantity",
        cell: (info) => info.getValue(),
        header: () => "Quantity"
      },
      {
        accessorKey: "status",
        cell: (info) => {
          if (info.getValue() === "pending payment")
            return "pending";
          else
            return info.getValue();
        },
        header: () => "Status"
      }
    ],
    []
  );


  return (
    TableHOC<TransactionType, string>(columns, data, "LATEST TRANSACTION")()
    // data being passed is of type transaction <T>, ani string means cell value is string <U>
  )
});

export default DashboardTable;

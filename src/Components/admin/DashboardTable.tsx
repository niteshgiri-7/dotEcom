import { ColumnDef } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
import { TransactionType } from '../../types/dashboard';
import TableHOC from './TableHOC';




const DashboardTable = memo(({ data }: { data: TransactionType[] }) => {

  const columns = useMemo<ColumnDef<TransactionType, string>[]>(
    () => [
      {
        accessorKey: '_id',
        cell: (info) => <span>{info.getValue().toString().slice(0,10)}...</span>,
        enableSorting: false,
      },
      {
        accessorKey: "total",
        cell: (info) => info.getValue(),
        header: () => "Total"
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
            return <span className='rounded-2xl'>{info.getValue()}</span>
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

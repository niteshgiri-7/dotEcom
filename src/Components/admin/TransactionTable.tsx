import { UseMutateFunction } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { IProcessOrderResponse } from "../../api/Admin/processOrder";
import { OrderedItem, Transaction, TransactionResponse } from "../../types/transaction";
import TableHOC from "./TableHOC";

interface Props {
    data: Transaction[];
    processOrder: UseMutateFunction<IProcessOrderResponse | null, Error, {
        id: number;
        status: string;
    }, {
        prev: TransactionResponse | undefined;
    }>
}


const TransactionTable = ({ data, processOrder }: Props) => {

    const columns = useMemo<ColumnDef<Transaction, string>[]>(() => [
        {
            accessorKey: 'orderedBy.name',
            header: 'User',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'shippingInfo.city',
            header: 'Address',
            cell: (info) => info.getValue()
        },
        {
            accessorFn: (row) => row.orderedItems.reduce((sum: number, item: OrderedItem) => sum + item.quantity, 0),
            header: 'Quantity',
            cell: (info) => <i>{info.getValue()}</i>
        },
        {
            accessorKey: "total",
            header: 'Total',
            cell: (info) => <>Rs.{info.getValue()}</>
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: (info) => <span className="font-bold text-white">{info.getValue()}</span>
        }, {
            accesorKey: 'update',
            header: 'updateStatus',
            cell: (info) => <button className="bg-[rgb(10,150,255)] p-1 lg:p-2 rounded-lg text-[rgba(255,255,255,0.8)] cursor-pointer hover:bg-opacity-80" onClick={() => processOrder({ id: info.row.original._id, status: info.row.original.status })}>update</button>
        }
    ],
        [processOrder]
    );


    return (
        TableHOC(columns, data, "Transactions", data.length > 8 ? true : false)()
    )
};

export default TransactionTable;
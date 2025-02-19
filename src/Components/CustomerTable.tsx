import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { CustomerData } from "../types/customer";
import { BASEURL } from "../utils/constants";
import TableHOC from "./TableHOC";






const CustomerTable = ({data}:{data:CustomerData[]}) => {
   
    const columns = useMemo<ColumnDef<CustomerData, string>[]>(() => [
        {
            accessorKey: 'photo',
            header: 'Photo',
            cell: (info) => <img src={`${BASEURL}${info.getValue()}`} className="max-h-[50px] md:max-h-[70px]  md:min-w-[70px] mx-auto rounded-full" alt="customer-photo"/>,
            enableSorting: false,
        },
        {
            accessorKey: "name",
            header: 'Name',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: "gender",
            header: 'Gender',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: (info) => info.getValue()
        },
    ],
        []
    );

    return (
        TableHOC<CustomerData, string>(columns, data, "Customers", false)()
    );
};


export default CustomerTable;
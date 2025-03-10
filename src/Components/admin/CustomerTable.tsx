import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { CustomerData } from "../../types/customer";
import TableHOC from "./TableHOC";






const CustomerTable = ({data}:{data:CustomerData[]}) => {
   
    const columns = useMemo<ColumnDef<CustomerData, string>[]>(() => [
        {
            accessorKey: 'photo.secure_url',
            header: 'Photo',
            cell: (info) => <img src={`${info.getValue()}`} className="max-h-[50px] md:max-h-[70px]  md:min-w-[70px] mx-auto rounded-full" alt="customer-photo"/>,
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
        TableHOC<CustomerData, string>(columns, data, "Customers",data.length>10?true:false)()
    );
};


export default CustomerTable;
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { TbTrashFilled } from "react-icons/tb";
import TableHOC from "./TableHOC";


interface customerDataType {
    id: number;
    photo: string;
    name: string;
    email: string;
    gender: string;
}

const customerData: customerDataType[] = [
    {
        id: 1,
        photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
        name: "John Doe",
        email: "johndoe@example.com",
        gender: "Male",
    },
    {
        id: 2,
        photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
        name: "Jane Smith",
        email: "janesmith@example.com",
        gender: "Female",
    },
    {
        id: 3,
        photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        gender: "Female",
    },
    {
        id: 4,
        photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
        name: "Bob Williams",
        email: "bobwilliams@example.com",
        gender: "Male",
    },
    {
        id: 5,
        photo: "https://avatars.githubusercontent.com/u/139582690?s=400&u=c06ac9677ecc5f59a58f67b6b969b49ea277665f&v=4",
        name: "Emily Davis",
        email: "emilydavis@example.com",
        gender: "Female",
    },
];

const CustomerTable = () => {

    const columns = useMemo<ColumnDef<customerDataType, string>[]>(() => [
        {
            accessorKey: 'photo',
            header: 'Photo',
            cell: (info) => <img src={info.getValue()} className="max-h-[50px] md:max-h-[70px] mx-auto rounded-full" />,
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
        {
            accessorKey: 'action',
            header: 'Action',
            cell: (info) => <TbTrashFilled onClick={() => console.log(info.row.original.id)} className="text-red-600 text-xl mx-auto cursor-pointer hover:text-red-800"/>
        }
    ],
        []
    );

    return (
        TableHOC<customerDataType, string>(columns, customerData, "Customers", true)()
    );
};


export default CustomerTable;
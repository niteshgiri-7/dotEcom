import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { FcGenericSortingAsc, FcGenericSortingDesc } from 'react-icons/fc';

const TableHOC = <T extends object,U>(columns:ColumnDef<T,U>[], data: T[], heading: string) => {
    const StatusColor = {
        Pending: "hsl(48, 100%, 67%)", // Soft Yellow (Indicates waiting)
        Processing: "hsl(220, 90%, 65%)", // Cool Blue (Represents active work in progress)
        Shipped: "hsl(204, 86%, 53%)", // Strong Teal (Represents movement & transit)
        Delivered: "hsl(120, 50%, 50%)", // Deep Green (Represents success & completion)
        Cancelled: "hsl(0, 85%, 55%)", // Bright Red (Represents termination)
        default: "hsl(0, 0%, 95%)", // Light Gray (Neutral for unknown statuses)
      };

    return function Table() {
        const [sorting, setSorting] = useState<SortingState>([]);
        const table = useReactTable({
            data,
            columns,
            state: { sorting },
            onSortingChange: setSorting,
            getCoreRowModel: getCoreRowModel(),//organizes rows and map them to their respective columns
            getSortedRowModel: getSortedRowModel(),
        })

        return (
            <div className="mt-5 pt-2 w-full h-fit lg:mt-0 lg:flex-1 lg:h-[25rem] bg-white rounded-xl lg:p-5 text-sm md:text-lg">
                <h2 className="font-bold text-2xl text-center">{heading}</h2>
                <div className="lg:p-3  flex justify-center items-center">
                    <table className='mt-2 h-full w-full border-spacing-y-1 border-separate   md:border-spacing-4 md:border-separate text-[0.8rem] md:text-[1.1rem]'>

                        <thead >

                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className=''>

                                    {headerGroup.headers.map(header => (
                                        <th className='text-center cursor-pointer' key={header.id}
                                            onClick={
                                                header.column.getToggleSortingHandler()
                                            }>
                                            <div className='flex justify-center items-center gap-1 select-none'>

                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() === 'asc' ? <FcGenericSortingAsc /> : <FcGenericSortingDesc />
                                                ) : null}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody >
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {

                                        const status = (cell.column.id === "Status" ? cell.getValue() : StatusColor.default) as keyof typeof StatusColor;

                                        return (
                                            <td className={`text-center  rounded-2xl p-1`} key={cell.id} style={{ backgroundColor: StatusColor[status] }}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )
                                    })
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableHOC;

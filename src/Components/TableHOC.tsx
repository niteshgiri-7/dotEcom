import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { FcGenericSortingAsc, FcGenericSortingDesc } from 'react-icons/fc';

const TableHOC = <T extends object, U>(columns: ColumnDef<T, U>[], data: T[], heading: string, showPagination: boolean = false) => {

    const StatusColor = {
        pending: "hsl(48, 100%, 67%)", // Soft Yellow (Indicates waiting)
        processing: "hsl(220, 90%, 65%)", // Cool Blue (Represents active work in progress)
        shipped: "hsl(204, 86%, 53%)", // Strong Teal (Represents movement & transit)
        delivered: "hsl(120, 50%, 50%)", // Deep Green (Represents success & completion)
        cancelled: "hsl(0, 85%, 55%)", // Bright Red (Represents termination)
        default: "rgb(255,255,255)", // Light Gray (Neutral for unknown statuses)
    };

    return function Table() {
        
        const [sorting, setSorting] = useState<SortingState>([]);
        const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 6 });
        
        const table = useReactTable({
            data,
            columns,
            state: { sorting, pagination },
            onSortingChange: setSorting,
            getCoreRowModel: getCoreRowModel(),//organizes rows and map them to their respective columns
            getSortedRowModel: getSortedRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onPaginationChange: setPagination,
        });

        const updatePageSize = () => {
            if (window.innerWidth <= 768) {
                setPagination((prev) => ({ ...prev, pageSize: 6 }))
            }
            else {
                setPagination((prev) => ({ ...prev, pageSize: 5 }))
            }
        };

        useEffect(() => {

            updatePageSize();
            window.addEventListener("resize", updatePageSize);

            return () => {
                window.removeEventListener("resize", updatePageSize);
            }
        }, []);

        return (
            <div className="mt-5 pt-2 max-w-full h-fit min-h-[30rem] lg:mt-0 lg:flex-1 rounded-xl lg:p-5 text-sm md:text-lg bg-white">
                <h2 className="font-bold text-2xl text-center">{heading}</h2>
                <div className="lg:p-3 p-2  flex flex-col justify-center items-center">

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
                                        let status :keyof typeof StatusColor="default";
                                            
                                        if(cell.column.id==="status"){
                                           status  =   cell.getValue()==="pending payment"?"pending":cell.getValue() as keyof typeof StatusColor
                                        }
                                         
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
                    {showPagination && <div className='flex gap-3 mt-1 items-center '>
                        <button className='bg-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-opacity-60 cursor-pointer' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</button>
                        <strong>{`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount().toLocaleString()}`}</strong>
                        <button className='bg-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-opacity-60 cursor-pointer' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
                    </div>
                    }
                </div>
            </div>
        );
    }
};

export default TableHOC;

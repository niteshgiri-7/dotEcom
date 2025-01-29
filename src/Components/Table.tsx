

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Transaction = {
  Id: string;
  Quantity: number;
  Discount: number;
  Amount: number;
  Status: string;
}

const StatusColor = {
  Pending: "hsl(48, 100%, 67%)", // Soft Yellow (Indicates waiting)
  Processing: "hsl(220, 90%, 65%)", // Cool Blue (Represents active work in progress)
  Shipped: "hsl(204, 86%, 53%)", // Strong Teal (Represents movement & transit)
  Delivered: "hsl(120, 50%, 50%)", // Deep Green (Represents success & completion)
  Cancelled: "hsl(0, 85%, 55%)", // Bright Red (Represents termination)
  default: "hsl(0, 0%, 95%)", // Light Gray (Neutral for unknown statuses)
};

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
    Quantity: 10,
    Discount: 200,
    Amount: 9999,
    Status: "Cancelled"
  },
  {
    Id: "fadksfasf",
    Quantity: 10,
    Discount: 200,
    Amount: 9999,
    Status: "Delivered"
  },
  {
    Id: "fadksfasf",
    Quantity: 10,
    Discount: 200,
    Amount: 9999,
    Status: "Shipped"
  },

]

const columnHelper = createColumnHelper<Transaction>()

const columns = [

  //By this way , parent header create garna sakincha, tara header Group garesi tala render garney bela isPlaceHolder check garnu parcha

  // columnHelper.group({
  //   header: 'Name', 
  //   columns: [
  //     columnHelper.accessor('firstName', { header: 'First' }), // Child Header
  //     columnHelper.accessor('lastName', { header: 'Last ' }),   // Child Header
  //   ],
  // }),
  columnHelper.accessor('Id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('Quantity', {
    header: () => 'Quantity',
    cell: info => info.getValue()
  }),
  columnHelper.accessor("Amount", {
    cell: info => <i>{info.getValue()}</i>,//to customize the cell value
    header: () => <span>Amount</span>
  }),
  columnHelper.accessor('Discount', {
    header: () => 'Discount',//no need if not passed then the string provided is auto assigned
    cell: info => info.getValue(),

  }),

  columnHelper.accessor('Status', {
    header: 'Status',
    cell: info => <span className='font-semibold text-gray-700'>{info.getValue()}</span>,

  }),


]
export const Table = () => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),//organizes rows and map them to their respective columns
  })

  return (
    <table className='mt-2 h-full w-full border-spacing-y-1 border-separate   md:border-spacing-6 md:border-separate'>
      <thead className=''>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className=''>
            {headerGroup.headers.map(header => (
              <th className='text-center' key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className=''>
        {table.getRowModel().rows.map(row => (
          <tr className="" key={row.id}>
            {row.getVisibleCells().map(cell => {
              const status = (cell.column.id==="Status"?cell.getValue():StatusColor.default) as keyof typeof StatusColor;
            return  <td className={`text-center  rounded-2xl p-1`} key={cell.id} style={{backgroundColor:StatusColor[status]}}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
})
            }
          </tr>
        ))}
      </tbody>
    </table>

  )
}



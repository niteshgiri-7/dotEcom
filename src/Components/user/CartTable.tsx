import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, removeItemFromCart, TCartItem } from "../../redux/cartSlice";
import { Trash2 } from "lucide-react";

// Product Cell Component
const ProductCellValue: React.FC<{ item: TCartItem }> = ({ item }) => (
  <div className="flex items-center">
    <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
      <img
        className="h-full w-full rounded-md object-cover"
        src={item.photo.secure_url || "/placeholder.svg"}
        alt={item.name}
      />
    </div>
    <div className="ml-2 sm:ml-4">
      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
        {item.name}
      </div>
    </div>
  </div>
);

// Quantity Cell Component
const QuantityCellValue: React.FC<{ item: TCartItem; onDecrement: (id: string) => void; onIncrement: (id: string) => void }> = ({ item, onDecrement, onIncrement }) => (
  <div className="flex ">
    <button
      className="text-gray-500 focus:outline-none focus:text-gray-600 p-0.5 sm:p-1"
      onClick={() => onDecrement(item._id)}
      aria-label="Decrease quantity"
    >
      <BiMinusCircle className="text-lg sm:text-xl" />
    </button>
    <span className="text-gray-700 mx-1 my-auto sm:mx-2 text-xs sm:text-sm">{item.quantity}</span>
    <button
      className="text-gray-500 focus:outline-none focus:text-gray-600 p-0.5 sm:p-1"
      onClick={() => onIncrement(item._id)}
      aria-label="Increase quantity"
    >
      <BiPlusCircle className="text-lg sm:text-xl" />
    </button>
  </div>
);

const CartTable: React.FC<{ cartItems: TCartItem[] }> = ({ cartItems }) => {
  const dispatch = useDispatch();

  // Handlers
  const handleDecrement = useCallback((id: string) => {
    dispatch(decrementQuantity(id));
  }, [dispatch]);

  const handleIncrement = useCallback((id: string) => {
    dispatch(incrementQuantity(id));
  }, [dispatch]);

  const handleRemove = useCallback((id: string) => {
    dispatch(removeItemFromCart(id));
  }, [dispatch]);

  // Define columns with responsive styling
  const columns = useMemo<ColumnDef<TCartItem>[]>(() => [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => <ProductCellValue item={row.original} />,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="text-xs sm:text-sm text-gray-900">${row.original.price.toFixed(2)}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <QuantityCellValue
          item={row.original}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />
      ),
    },
    {
      id: "total",
      header: "Total",
      cell: ({ row }) => (
        <div className="text-xs sm:text-sm text-gray-900">
          ${(row.original.price * row.original.quantity).toFixed(2)}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          className="text-red-500 hover:text-red-700 flex justify-end"
          onClick={() => handleRemove(row.original._id)}
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      ),
    },
  ], [handleDecrement, handleIncrement, handleRemove]);

  const table = useReactTable({
    data: cartItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 overflow-hidden">
      {/* Default Table Layout for Larger Screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*for Mobile */}
      <div className="block sm:hidden space-y-4 p-4">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className="border border-gray-200 rounded-md p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <ProductCellValue item={row.original} />
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemove(row.original._id)}
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-900">
              <div>
                <span className="font-medium">Price:</span> ${row.original.price.toFixed(2)}
              </div>
              <div className="flex justify-center">
                <QuantityCellValue
                  item={row.original}
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                />
              </div>
              <div className="text-right">
                <span className="font-medium">Total:</span> ${(row.original.price * row.original.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartTable;
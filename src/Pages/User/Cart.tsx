import { Link } from "react-router-dom"

const cartItems = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: 89.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 7,
    name: "Denim Jeans",
    price: 59.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

const CartPage = () => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10.0
  const total = subtotal + shipping

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button className="text-gray-500 focus:outline-none focus:text-gray-600 p-1">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </button>
                        <span className="text-gray-700 mx-2">{item.quantity}</span>
                        <button className="text-gray-500 focus:outline-none focus:text-gray-600 p-1">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-500 hover:text-red-700">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-800">${shipping.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between mb-6">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-lg font-semibold text-blue-600">${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center px-4 py-2 rounded-md transition-colors duration-300"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage


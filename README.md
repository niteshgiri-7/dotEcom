# **dotEcom(Frontend)**
🚀 **Admin Dashboard for dotEcom(till now)** | Built with React, TypeScript, and TanStack Table  

## **Overview**
dotEcom-Admin is the frontend for the **dotEcom-Server** backend. Features admin dashboard that provides an intuitive interface for managing products, transactions, and customers data while using data visualization tools like pie-chart,bar-chart for better insights.

## **Tech Stack**
- **Frontend:** React, TypeScript, Vite  
- **State Management:** React Query (@tanstack/query)  
- **Tables:** TanStack Table (@tanstack/table)  
- **Charts:** React-chartjs-2 
- **Routing:** React Router  
- **Styling:** Tailwind CSS 

## **Features**
✅ **Dynamic Dashboard** – Visualize key metrics using charts  
✅ **Product Management** – CRUD operations on products  
✅ **Customer Insights** – View and manage customer details  
✅ **Transaction Tracking** – Monitor order transactions  
✅ **Data Tables** – Interactive tables with sorting and pagination  

## **To-Do (In Development)**
- [ ] **Integrate dotEcom-Server(backend)**
- [ ] **Implement Authentication (Login/Logout)**
- [ ] **Add Export Feature for Reports (CSV, PDF)**
- [ ] **Implement dotEcom customer's UI(product pages,cart,checkout etc)**

make the checkout page
make api call to save the cart info,
integrate payment,
protect routes via authenticate user and admin only



"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface OrderItemProps {
  order: {
    id: string
    date: string
    total: number
    status: string
    items: Array<{
      id: number
      name: string
      price: number
      quantity: number
    }>
  }
  onCancel: () => void
}

export default function OrderItem({ order, onCancel }: OrderItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
            <p className="text-sm text-gray-500">Placed on {order.date}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
            <p
              className={`text-sm ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : order.status === "Shipped"
                    ? "text-blue-600"
                    : "text-yellow-600"
              }`}
            >
              {order.status}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                View Details
              </>
            )}
          </button>

          {order.status !== "Delivered" && (
            <button className="text-red-600 hover:text-red-800 text-sm font-medium" onClick={onCancel}>
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 px-6 py-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Order Items:</h3>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <div>
                  <p className="text-sm text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}





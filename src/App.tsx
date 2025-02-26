import { lazy, Suspense } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./Pages/Login";
import SignUp from "./Pages/SingUp";


const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Products = lazy(() => import("./Pages/Products"));
const ManageProduct = lazy(() => import("./Pages/ManageProduct"))
const Transaction = lazy(() => import("./Pages/Transaction"));
const Customers = lazy(() => import("./Pages/Customers"));
const Coupon = lazy(() => import("./Pages/Coupon"));
const Toss = lazy(() => import("./Pages/Toss"));
const StopWatch = lazy(() => import("./Pages/StopWatch"));

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/signUp" />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/:id" element={<ManageProduct />} />
            <Route path="/admin/transactions" element={<Transaction />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/coupon" element={<Coupon />} />
            <Route path="/admin/toss" element={<Toss />} />
            <Route path="/admin/stop-watch" element={<StopWatch />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider >
  );
};

export default App;

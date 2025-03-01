import { lazy, Suspense } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./Pages/Login";
import SignUp from "./Pages/SingUp";
import Home from "./Pages/User/Home";
import UserLayout from "./Pages/User/UserLayout";
import CartPage from "./Pages/User/Cart";


const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
const Products = lazy(() => import("./Pages/Admin/Products"));
const ManageProduct = lazy(() => import("./Pages/Admin/ManageProduct"))
const Transaction = lazy(() => import("./Pages/Admin/Transaction"));
const Customers = lazy(() => import("./Pages/Admin/Customers"));
const Coupon = lazy(() => import("./Pages/Admin/Coupon"));
const Toss = lazy(() => import("./Pages/Admin/Toss"));
const StopWatch = lazy(() => import("./Pages/Admin/StopWatch"));

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
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

            <Route path="/" element={<UserLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>

          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider >
  );
};

export default App;

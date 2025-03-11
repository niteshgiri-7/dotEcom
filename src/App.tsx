import { lazy, Suspense } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

import UserLayout from "./Pages/User/UserLayout";

import { store } from "./redux/store";

import "./api/axiosInterceptor";
import ProtectedAdminRoutes from "./Components/ProtectedAdminRoutes";
import ProtectedUserRoute from "./Components/ProtectedUserRoute";
import NotFound from "./Pages/NotFound";

const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
const Products = lazy(() => import("./Pages/Admin/Products"));
const ManageProduct = lazy(() => import("./Pages/Admin/ManageProduct"))
const Transaction = lazy(() => import("./Pages/Admin/Transaction"));
const Customers = lazy(() => import("./Pages/Admin/Customers"));
const Coupon = lazy(() => import("./Pages/Admin/Coupon"));
const Toss = lazy(() => import("./Pages/Admin/Toss"));
const StopWatch = lazy(() => import("./Pages/Admin/StopWatch"));
const Home = lazy(() => import("./Pages/User/Home"));
const CartPage = lazy(() => import("./Pages/User/Cart"));
const MyOrders = lazy(() => import("./Pages/User/MyOrders"));
const CheckoutPage = lazy(() => import("./Pages/User/CheckOut"));
const PaymentCallback = lazy(() => import("./Pages/User/PaymentCallBack"));

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>

              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedAdminRoutes />}>

                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/admin/products/:id" element={<ManageProduct />} />
                <Route path="/admin/transactions" element={<Transaction />} />
                <Route path="/admin/customers" element={<Customers />} />
                <Route path="/admin/coupon" element={<Coupon />} />
                <Route path="/admin/toss" element={<Toss />} />
                <Route path="/admin/stop-watch" element={<StopWatch />} />
              </Route>

              <Route element={<ProtectedUserRoute />}>

                <Route path="/" element={<UserLayout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment-callback" element={<PaymentCallback />} />
                </Route>

              </Route>
            <Route path="/*" element={<NotFound/>}/>
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </QueryClientProvider >
  );
};

export default App;

import { lazy, Suspense } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";


const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Products = lazy(() => import("./Pages/Products"));
const ManageProduct = lazy(() => import("./Pages/ManageProduct"))
const Transaction = lazy(() => import("./Pages/Transaction"));
const Customers = lazy(() => import("./Pages/Customers"));
const Coupon = lazy(() => import("./Pages/Coupon"));
const Toss = lazy(() => import("./Pages/Toss"));
const StopWatch = lazy(()=>import("./Pages/StopWatch"));

function App() {

  return <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/:id" element={<ManageProduct />} />
        <Route path="/admin/transactions" element={<Transaction />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/coupon" element={<Coupon />} />
        <Route path="/admin/toss" element={<Toss />} />
        <Route path="/admin/stop-watch" element={<StopWatch/>}/>
      </Routes>
    </Suspense>
  </Router>
}

export default App;

import React from "react";
import { useVerifyPayment } from "../../hooks/user/useVerifyPayment";
import { useErrorNotification } from "../../hooks/useErrorNotification";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { clearCart } from "../../redux/cartSlice";

const PaymentCallback: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { data, isLoading, isError, error } = useVerifyPayment();
     if(data?.success){
        localStorage.removeItem("cartItems");
        dispatch(clearCart(undefined));
     }
    useErrorNotification(isError, error);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {isLoading ? (
                <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
                    <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-800">Verifying Payment...</h2>
                    <p className="text-gray-600 mt-2">Please wait while we confirm your transaction.</p>
                </div>
            ) : error ? (
                <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
                    <span className="text-5xl block mb-4">❌</span>
                    <h2 className="text-xl font-semibold text-red-600">Verification Failed</h2>
                    <p className="text-gray-600 mt-2">
                        {error.message || "Something went wrong. Please try again!"}
                    </p>
                    <button
                        onClick={() => navigate("/home",{replace:true})}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Back to Home
                    </button>
                </div>
            ) : data?.success ? (
                <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
                    <span className="text-5xl block mb-4">✅</span>
                    <h2 className="text-xl font-semibold text-green-600">Payment Successful!</h2>
                    <p className="text-gray-600 mt-2">Your order has been confirmed. Thank you for shopping!</p>
                    <button
                        onClick={() => navigate("/home",{replace:true})}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
                    <span className="text-5xl block mb-4">⚠️</span>
                    <h2 className="text-xl font-semibold text-red-600">Payment Failed</h2>
                    <p className="text-gray-600 mt-2">
                        Your payment is still processing or failed. Please try again or contact support.
                    </p>
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentCallback;
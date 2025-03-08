import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiLock, BiLogIn, BiStore } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useErrorNotification } from "../hooks/useErrorNotification";
import { useLogin } from "../hooks/useLogin";
import { LoginPageImage } from "../utils/constants";
import { loginFormValidationSchema } from "../utils/formSchema";
import { LoginFormInitialValues } from "../utils/initialFormValues";



const Login = () => {


    const { handleLogin, isLoading, error, clearError } = useLogin();
    useErrorNotification(error.isError, error);

  

    return (
        <div className="min-h-screen flex">

            <div className="hidden lg:flex lg:w-1/2 relative">
                <img
                    src={LoginPageImage}
                    alt="Electronics store display"
                    className="object-cover w-full"
                />
                <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                        <BiStore className="w-20 h-20 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold mb-4">Welcome to dotEcom Captain!</h2>
                        <p className="text-2xl font-semibold text-blue-100">Inventories waiting your way</p>
                    </div>
                </div>
            </div>


            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <BiStore className="w-12 h-12 mx-auto mb-4 text-[rgb(10,150,255)]" />
                        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                        <p className="text-gray-600 mt-2">Please sign in to your account</p>
                    </div>
                    <Formik
                        initialValues={LoginFormInitialValues}
                        validationSchema={loginFormValidationSchema}
                        onSubmit={(values) => {
                            localStorage.setItem("rememberMe",JSON.stringify(values.rememberMe));
                            handleLogin(values);
                        }}
                    >
                        {({ setFieldValue }) => (


                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                            placeholder="Enter your email"
                                            required
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setFieldValue("email", e.target.value); clearError(); }}
                                        />
                                    </div>
                                    <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <BiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <Field
                                            id="password"
                                            type="password"
                                            name="password"
                                            autoComplete="current-pasword"
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                            placeholder="Enter your password"
                                            required
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setFieldValue("password", e.target.value); clearError(); }}
                                        />
                                    </div>
                                    <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                                    <p className="text-sm text-red-600 mt-2">{error.message}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Field
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500" onClick={() => toast.error("This feature has not been brewed yet.Coming soon! Sorry Captain!")}>
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-style w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <ClipLoader size={30} /> :
                                        <>
                                            <BiLogIn className="w-5 h-5 " />
                                            Login
                                        </>
                                    }
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <p className="text-center mt-4">
                        Don't have an account?
                        <Link to="/signUp">
                            <span className="font-semibold text-blue-600">{" "}Create Account</span>
                        </Link>
                    </p>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Login

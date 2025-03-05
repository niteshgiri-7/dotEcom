import { UseMutateFunction } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TCartItem } from "../../redux/cartSlice";
import { ICheckOutFormValues } from "../../types/checkOutForm";
import { IinitiatePaymentRequestPayload, IinitiatePaymentResponse } from "../../types/payment";
import { checkOutFormSchema } from "../../utils/formSchema";
import ClipLoader from "react-spinners/ClipLoader";

const initialValues:ICheckOutFormValues ={
   city:"",
   state:"",
   pinCode:0,
   country:"Nepal",
   couponCode:""
  
} 

const CheckOutForm = ({initiatePayment,cartItems,total,isLoading}:{initiatePayment: UseMutateFunction<IinitiatePaymentResponse, Error, IinitiatePaymentRequestPayload, unknown>,cartItems:TCartItem[],total:number,isLoading:boolean}) => {

  
  const handleSubmit = (values:ICheckOutFormValues)=>{

     const {couponCode,...shippingInfo}=values;

     const payLoad:IinitiatePaymentRequestPayload={
      shippingInfo,
      couponCode,
      orderedItems:cartItems,
      total:total
     }

     initiatePayment(payLoad);
  }


  return (
 
    <div className="flex-grow">
        <Formik 
          initialValues={initialValues}
          validationSchema={checkOutFormSchema}
           onSubmit={(values)=>handleSubmit(values)}
        >

    <Form  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Field
            type="text"
            id="city"
            name="city"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <ErrorMessage name="city"  component="div" className="text-sm text-red-600"/>
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State / Province
          </label>
          <Field
            type="text"
            id="state"
            name="state"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <ErrorMessage name="state" component="div" className="text-sm text-red-600"/>
        </div>

        <div>
          <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
            ZIP / Postal Code
          </label>
          <Field
            type="text"
            id="pinCode"
            name="pinCode"
            placeholder="Enter zip code"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <ErrorMessage name="pinCode" component="div" className="text-sm text-red-600"/>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            id="country"
            name="country"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option>Nepal</option>
          </select>
        </div>


      </div>

        <div>
          <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-1">
          Coupon Code
          </label>
          <Field
            type="text"
            id="couponCode"
            name="couponCode"
            placeholder="Enter coupon code to get discount (optional)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <ErrorMessage name="couponCode" component="div" className="text-sm text-red-600"/>
        </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 mt-3"
        disabled={isLoading}
      >
       {isLoading?<ClipLoader/>:"Pay with Khalti"}
      </button>
    </Form>
        </Formik>
  </div>
  )
}

export default CheckOutForm;

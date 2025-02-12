import { useState } from "react";
import NavBar from "../Components/NavBar";
import CouponTable from "../Components/CouponTable";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaCopy } from "react-icons/fa";

interface inputType {
    inputString: string;
    length: number;
    discount: number|string;
    expiresAt: Date | string;
    couponStatus?:"expired"|"used"|"available"
}

const couponFormSchema = Yup.object().shape({
    length: Yup.number().min(5, "Too small").max(21, "Too long").required("Required"),
    inputString: Yup.string().min(2, "Too small").max(10, "Too long").required("Required"),
    discount: Yup.number().min(50, "Must be atleast 50").required("Required"),
    expiresAt: Yup.date().min(new Date(), "Invalid date").required("Required")
})

const Coupon = () => {


    const [couponCode,setCouponCode] = useState<string>("");
   
    const letters: string[] = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
    ];

    const generateCoupon = (prefix: string, length: number): string => {
        let coupon: string = prefix;

        if (prefix.length > 10 || length > 20) return "Too long";

        if (length < prefix.length) return "invalid input";

        for (let i = 0; i < (length - prefix.length); i++) {
            const idx = Math.floor(Math.random() * (letters.length));
            coupon += letters[idx];
        }
        setCouponCode(coupon);
        return coupon;
    }

    const copyToClipBoard = ()=>{
        if(couponCode.length>0){
            navigator.clipboard.writeText(couponCode);
            alert("Coupon Code copied");
        }
    }
    
    const initialValues:inputType = {
            inputString:"",
            discount:"",
            expiresAt:"",
            length:0,
    }
    return (
        <div className="md:flex min-h-fit min-w-full">
            <NavBar />
            <main className="flex-1 p-8 lg:flex lg:gap-2 max-w-full bg-gray-200 ">
                <div className="bg-white lg:h-full lg:flex lg:flex-col justify-center items-center  lg:max-h-[38.5rem] rounded-lg p-3">
                    <p className="text-2xl text-center font-bold ">Create New Coupon</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={couponFormSchema}
                        onSubmit={(values,{resetForm})=>{
                            generateCoupon(values.inputString,values.length);
                            resetForm();
                        }}
                    >
                        <Form className="flex flex-col  p-3  gap-3">
                            <label htmlFor="inputString">Prefix</label>
                            <Field id="inputString" name="inputString" placeholder="Enter a string to include" className="input-style" />
                            <ErrorMessage name="inputString" component="div" className="text-red-500 text-sm" />

                            <label htmlFor="discount">Discount</label>
                            <Field id="discount" name="discount" placeholder="Enter Discount " className="input-style" />
                            <ErrorMessage name="discount" component="div" className="text-red-500 text-sm" />

                            <label htmlFor="length">Length</label>
                            <Field id="length" name="length" placeholder="Enter length" className="input-style"  />
                            <ErrorMessage name="length" component="div" className="text-red-500 text-sm" />

                            <label htmlFor="expiresAt">Expiry Time</label>
                            <Field id="expiresAt" name="expiresAt" placeholder="Choose validity date"  className="input-style" type="date" />
                            <ErrorMessage name="expiresAt" component="div" className="text-red-500 text-sm" />

                            <button type="submit" className="btn-style w-full mt-5">Generate</button>
                            
                           {couponCode && <strong className="text-center m-3 flex justify-center items-center gap-2 cursor-pointer" onClick={copyToClipBoard}>{couponCode} 
                                <span >{" "}<FaCopy/></span>
                            </strong>
}
                        </Form>
                    </Formik>
                </div>
                <div className="flex-1">

                <CouponTable />
                </div>
            </main>
        </div>
    )
}

export default Coupon;

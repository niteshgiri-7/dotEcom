import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import CouponTable from "../../Components/CouponTable";
import Loader from "../../Components/Loader";
import NavBar from "../../Components/NavBar";
import { useCoupon, useCreateNewCoupon } from "../../hooks/useCoupon";
import { useErrorNotification } from "../../hooks/useErrorNotification";
import { ICoupon } from "../../types/coupon";
import { generateCoupon } from "../../utils/generateCoupon";
import WowSuchEmpty from "../../Components/WowSuchEmpty";

export interface CouponFormInputType {
    inputString: string;
    length: number | string;
    discount: number | string;
    expiresAt: Date | string;
    maxRedemptionCount: string | number;
}

const couponFormSchema = Yup.object().shape({
    length: Yup.number().typeError("Must be number").min(5, "Too small").max(21, "Too long").required("Required"),
    inputString: Yup.string().min(2, "Too small").max(10, "Too long").required("Required"),
    discount: Yup.number().min(50, "Must be atleast 50").required("Required"),
    maxRedemptionCount: Yup.number().typeError("Must be number").min(0, "Must be greater than 1").required("Required"),
    expiresAt: Yup.date().min(new Date(), "Invalid date").required("Required")
})

const Coupon = () => {
    console.log("rendered coupon")
    const { data, isError, error, isPending } = useCoupon();

    const { mutate: createNewCoupon, isPending: isCreating, isError: isErrorOnCreate, error: errorOnCreate } = useCreateNewCoupon();

    useErrorNotification(isError, error, error?.message);
    useErrorNotification(isErrorOnCreate, errorOnCreate, errorOnCreate?.message);

    const [couponCode, setCouponCode] = useState<string>("");

    const copyToClipBoard = () => {
        if (couponCode.length > 0) {
            navigator.clipboard.writeText(couponCode);
            toast.success("Coupon Code copied", { duration: 2000 });
        }
    }

    const initialValues: CouponFormInputType = {
        inputString: "",
        discount: "",
        expiresAt: "",
        length: "",
        maxRedemptionCount: ""
    }

    const handleSave = (values: CouponFormInputType) => {
        const couponToSave: ICoupon = {
            code: couponCode,
            discountedAmount: values.discount,
            maxRedemptionCount: values.maxRedemptionCount,
            expiresAt: values.expiresAt
        };

        createNewCoupon(couponToSave);
        setCouponCode("")

    }

    return (
        <div className="md:flex h-screen  min-w-full bg-gray-200">
            <NavBar />
            <main className="flex-1 p-8 lg:flex lg:gap-2 max-w-full  ">
                <div className="bg-white min-h-fit lg:h-full lg:flex lg:flex-col justify-center items-center  lg:max-h-[38.5rem] rounded-lg p-3">
                    <p className="text-2xl text-center font-bold ">Create New Coupon</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={couponFormSchema}
                        onSubmit={(values, { resetForm }) => {
                            handleSave(values);
                            resetForm();

                        }}
                    >
                        {({ values }) => (
                            <Form className="flex flex-col  p-3  gap-3 ">
                                <label htmlFor="inputString">Prefix</label>
                                <Field id="inputString" name="inputString" placeholder="Enter a string to include" className="input-style" />
                                <ErrorMessage name="inputString" component="div" className="text-red-500 text-sm" />

                                <label htmlFor="discount">Discount</label>
                                <Field id="discount" name="discount" placeholder="Enter Discount " className="input-style" />
                                <ErrorMessage name="discount" component="div" className="text-red-500 text-sm" />

                                <label htmlFor="length">Length</label>
                                <Field id="length" name="length" placeholder="Enter length" className="input-style" />
                                <ErrorMessage name="length" component="div" className="text-red-500 text-sm" />

                                <label htmlFor="maxRedemptionCount">RedemLimit</label>
                                <Field id="maxRedemptionCount" name="maxRedemptionCount" placeholder="Number of redeems allowed" className="input-style" required />
                                <ErrorMessage name="maxRedemptionCount" component="span" className="text-red-500 text-sm" />

                                <label htmlFor="expiresAt">Expiry Time</label>
                                <Field id="expiresAt" name="expiresAt" placeholder="Choose validity date" className="input-style" type="date" required />
                                <ErrorMessage name="expiresAt" component="div" className="text-red-500 text-sm" />

                                <button type="button" className="btn-style w-full mt-5" onClick={() => generateCoupon(values.inputString, String(values.length), setCouponCode)}>Generate</button>

                                {couponCode && <div className="text-center m-3 flex justify-center items-center gap-2" >{couponCode}
                                    <span >{" "}<FaCopy onClick={copyToClipBoard} className="cursor-pointer" /></span>
                                    <br></br>
                                    <button className="btn-style" disabled={isCreating} type="submit">{isCreating ? <ClipLoader size={30} /> : "Save"}</button>
                                </div>
                                }
                            </Form>
                        )
                        }
                    </Formik>
                </div>
                {
                    isPending ? <Loader />
                        :

                        <div className="flex-1 justify-center items-center">
                            {
                                !data?.coupons ?
                                    <WowSuchEmpty /> :

                                    <CouponTable data={data.coupons} />
                            }
                        </div>
                }
            </main>
            <Toaster position="top-center" />
        </div>
    )
}

export default Coupon;

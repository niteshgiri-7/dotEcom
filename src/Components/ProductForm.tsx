import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";

interface productFormType {
    name: string;
    price: number | string;
    stock: number | string;
    category: string;
    photo: File | null | undefined | string;
}

type productFormPropsType =()=>void;

const productFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.number()
        .min(2, 'Too Short!')
        .max(9999, 'Too Long!')
        .required('Required'),
    stock: Yup.number()
        .min(1, 'Too Low!')
        .max(9999, 'Too High!')
        .required('Required'),
    category: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});
const ProductForm = ({closeForm,productToManage}:{closeForm?:productFormPropsType,productToManage?:productFormType
}) => {
    const initialValues: productFormType = !closeForm && productToManage ? {
        category: productToManage.category,
        name: productToManage.name,
        price: productToManage.price,
        photo: '',
        stock: productToManage.stock,

    }:{
        category: '',
        name: '',
        price: '',
        photo: '',
        stock: '',
    }
    return (
        <div className={`max-w-screen  flex justify-center items-center ${closeForm && "h-screen absolute top-1/2 left-1/2 transition-transform -translate-x-1/2 -translate-y-1/2 z-20"}`}>
            <div className="max-w-[90vw] h-fit bg-white rounded-lg shadow-xl shadow-gray-700 p-8 flex flex-col justify-center items-center relative">
             { closeForm &&  <IoClose className="absolute top-3 right-3 text-3xl cursor-pointer" onClick={closeForm}/>}
                <h1>
                    <strong>Add New Product</strong>
                </h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={productFormSchema}
                    onSubmit={(values) => console.log(values)}
                >
                    <Form className="w-full h-full flex flex-col gap-2">

                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" placeholder="Enter Product Name" className="input-style"/>
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="category">Category</label>
                        <Field id="category" name="category" placeholder="Enter Product Category" className="input-style"/>
                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="stock">Stock</label>
                        <Field id="stock" name="stock" placeholder="Enter the available stock" className="input-style"/>
                        <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="price">Price</label>
                        <Field id="price" name="price" placeholder="Enter Price" className="input-style"/>
                        <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="photo">Photo</label>
                        <input id="photo" name="photo" placeholder="Choose product image" type="file" accept="image/jpeg, image/png, image/webp" required/>
                        <ErrorMessage name="photo" component="div" className="text-red-500 text-sm" />

                        <button type="submit" className="btn-style w-full">Submit</button>
                    </Form>
                </Formik>
            </div>
           {closeForm && <div className="w-screen h-screen backdrop-blur-sm absolute top-0 -z-10 " onClick={closeForm}/>}
        </div>

    )
}

export default ProductForm

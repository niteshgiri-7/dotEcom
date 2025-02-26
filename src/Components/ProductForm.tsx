import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoClose } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import { useAddNewProduct } from "../hooks/useAddNewProduct";
import { useEditProduct } from "../hooks/useEditProduct";
import { useErrorNotification } from "../hooks/useErrorNotification";
import { Product, ProductFormData } from "../types/product";
import { productFormSchema } from "../utils/formSchema";



//closeForm is being used to close the modal while adding new product 
//product is being used to populate the product form when clicking manage(ofc from product table(Product page))
const ProductForm = ({ closeForm, product,id }: {
    closeForm?:()=>void, product?: Product,id?:string
}) => {

    const { mutate:addProduct,error:errorOnAdd,isPending:isAddPending,isError:isErrorOnAdd } = useAddNewProduct(closeForm!);

    const {mutate:updateProduct,error:errorOnEdit,isPending:isEditPending,isError:isErrorOnEdit} = useEditProduct(id!);
     
    useErrorNotification(isErrorOnAdd,errorOnAdd,errorOnAdd?.message);
    useErrorNotification(isErrorOnEdit,errorOnEdit,errorOnEdit?.message);

//make edit,add,delete full fledge and invaldie cache data

    const handleSubmit = (values: ProductFormData) => {
        console.log("calling mutate")
        if (!closeForm && product)
            updateProduct({values,id:id!});
        else
            addProduct(values);
    }

    //pre-filling form if it is opened to edit,by checking if the [closeForm==>(setIsOpen(false)) of modal] and product is true)
    //else the form remains fresh and empty..
    const initialValues: ProductFormData = !closeForm && product ? {
        category: product.category,
        name: product.name,
        price: String(product.price),
        photo: '',
        stock: String(product.stock),

    } : {
        category: '',
        name: '',
        price: '',
        photo: '',
        stock: '',
    }
    return (
        <div className={`max-w-screen  flex justify-center items-center ${closeForm && "h-screen absolute top-1/2 left-1/2 transition-transform -translate-x-1/2 -translate-y-1/2 z-20"}`}>
            <div className="max-w-[90vw] h-fit bg-white rounded-lg shadow-xl shadow-gray-700 p-8 flex flex-col justify-center items-center relative">
                {closeForm && <IoClose className="absolute top-3 right-3 text-3xl cursor-pointer" onClick={closeForm} />}
                <h1>
                    <strong>{product ? "Edit Product Info" : "Add New Product"}</strong>
                </h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={productFormSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {(props) => (


                        <Form className="w-full h-full flex flex-col gap-2">

                            <label htmlFor="name">Name</label>
                            <Field id="name" name="name" placeholder="Enter Product Name" className="input-style" />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                            <label htmlFor="category">Category</label>
                            <Field id="category" name="category" placeholder="Enter Product Category" className="input-style" />
                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />

                            <label htmlFor="stock">Stock</label>
                            <Field id="stock" name="stock" placeholder="Enter the available stock" className="input-style" />
                            <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />

                            <label htmlFor="price">Price</label>
                            <Field id="price" name="price" placeholder="Enter Price in USD" className="input-style" />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />

                            <label htmlFor="photo">Photo</label>
                            <input id="photo" name="photo" placeholder="Choose product image" type="file" accept="image/jpeg, image/png, image/webp" required
                                onChange={(event) => { props.setFieldValue("photo", event.currentTarget.files![0]) }}
                            />
                            <ErrorMessage name="photo" component="div" className="text-red-500 text-sm" />

                            <button type="submit" className="btn-style w-full">{isAddPending || isEditPending ? <ClipLoader size={30}/>:"Submit"}</button>
                        </Form>
                    )}
                </Formik>
            </div>
            {closeForm && <div className="w-screen h-screen backdrop-blur-sm absolute top-0 -z-10 " onClick={closeForm} />}
        </div>

    )
}

export default ProductForm;

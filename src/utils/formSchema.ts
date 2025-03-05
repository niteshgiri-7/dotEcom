import * as Yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const signUpFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  photo: Yup.mixed<File>()
    .required("Photo is required")
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value) return true;
      return value.size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return SUPPORTED_FORMATS.includes(value.type);
    }),
  gender: Yup.string()
    .oneOf(["male", "female"], "Please select a valid gender")
    .required("Gender is required"),
});


//learnt about xss attacks, and yeah! validate gardimnata,below is the r.expression to test inputs

const xssRegex = /(<([^>]+)>|javascript:|on\w+=)/i; // Matches <script>, <img>, event handlers, etc.

export const loginFormValidationSchema= Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .test('xss-check', 'Invalid input detected', value => {
      if (!value) return true;
      return !xssRegex.test(value); 
    }),

  password: Yup.string()
    .min(6, "Must be at least 6 characters long")
    .max(20, "Too long")
    .test('xss-check', 'Invalid input detected', value => {
      if (!value) return true;
      return !xssRegex.test(value);
    })
    .required("Required"),
});


export const productFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .min(2, "Too Short!")
    .max(9999, "Too Long!")
    .typeError("Must be number")
    .required("Required"),
  stock: Yup.number()
    .min(1, "Too Low!")
    .max(9999, "Too High!")
    .typeError("Must be number")
    .required("Required"),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});


export const checkOutFormSchema = Yup.object().shape({
  city:Yup.string().min(5,"Too Short!").required("Required"),
  state:Yup.string().min(5).required("Required"),
  pinCode:Yup.number().required("Required").test("length","Must be 4-6 digits",(code)=>code.toString().length>=4 && code.toString().length<=6).typeError("Must be number"),
  couponCode:Yup.string(),
})

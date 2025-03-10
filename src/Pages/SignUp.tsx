import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Calendar, Image, Lock, Mail, Store, User, Users } from 'lucide-react';
import { ChangeEvent, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useErrorNotification } from '../hooks/useErrorNotification';
import { useSignUp } from '../hooks/useSignUp';
import { LoginPageImage } from '../utils/constants';
import { signUpFormValidationSchema } from '../utils/formSchema';
import { signUpFromInitialValues } from '../utils/initialFormValues';
import { getAuthFromLocalStorage } from '../utils/localStorage';


const SignUp = () => {
  
  const navigate = useNavigate();
  const { hasUser, role } = getAuthFromLocalStorage();
  useEffect(() => {
    if (hasUser) {
      if (role === "admin")
        navigate("/admin/dashboard", { replace: true });
      else
        navigate("/home");
    }
  }, [hasUser, role, navigate])

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleSignUp, isLoading, error, clearError } = useSignUp();

  useErrorNotification(error.isError, error);

  return (
    <div className="min-h-screen flex">

      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={LoginPageImage}
          alt="Electronics workspace"
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <Store className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Join dotEcom Today!</h2>
            <p className="text-2xl font-semibold text-blue-100">Your journey to amazing deals begins here</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Store className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Join our community of tech enthusiasts</p>
          </div>

          <Formik
            initialValues={signUpFromInitialValues}
            validationSchema={signUpFormValidationSchema}
            onSubmit={(values) => {
              handleSignUp(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Name
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    placeholder="John Doe"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    autoComplete="username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    placeholder="you@example.com"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setFieldValue("email", e.target.value); clearError() }}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                  <span className='text-sm text-red-600'>{error.message}</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Password
                    </span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date of Birth
                    </span>
                  </label>
                  <Field
                    type="date"
                    name="dob"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Image className="w-4 h-4 mr-2" />
                      Profile Photo
                    </span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      setFieldValue('photo', file);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Accepted formats: JPG, JPEG, PNG (max 5MB)
                  </p>
                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Gender
                    </span>
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-style w-full"
                >
                  {isLoading ? <ClipLoader size={30} /> : 'Create Account'}
                </button>
              </Form>
            )}
          </Formik>
          <p className='text-center mt-2'>Already have an account?{" "}
            <Link to="/login">
              <span className='text-blue-600 font-semibold cursor-pointer'>Login</span>
            </Link>
          </p>
        </div>
      </div>
      <Toaster position='top-center' />
    </div>
  );
};

export default SignUp;
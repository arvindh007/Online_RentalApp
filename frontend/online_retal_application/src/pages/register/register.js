import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterPage = ({ setIsRegisterOpen, isRegisterOpen }) => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required *"),
    lastname: Yup.string().required("Lastname is required *"),
    email: Yup.string().email("Invalid email format *").required("Email is required *"),
    password: Yup.string()
      .required("Password is required *")
      .min(8, "Password must be at least 8 characters *")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character *"),
    phonenumber: Yup.string().required("Phone number is required *"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match *").required("Confirm Password is required *"),
    Usertype:  Yup.string().required("Usertype is required *"),
  });

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmpassword: "",
        Usertype: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const DATA = {
          email: values.email,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,    
          phonenumber: values.phonenumber,
          IS_Seller: values.Usertype == 'Seller' ? true : false
        };
        console.log('====================================');
        console.log(DATA);
        console.log('====================================');
        
        try {
          const response = await axios.post("http://localhost:5001/api/CreateUser", DATA, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          localStorage.setItem("user_id", JSON.stringify(response?.data?.record?._id));
          localStorage.setItem("user", JSON.stringify(response?.data?.record));
          toast.success("Registered successfully");
          setIsRegisterOpen(!isRegisterOpen);
  
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data;
            if (errorData.message) {
              toast.error(errorData.message);
            } else {
              toast.error("Something went wrong");
            }
          } else {
            console.log("Error Message", error);
          }
        }
      }}
    >
      {({ handleSubmit }) => (
        <div
          className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${isRegisterOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-white w-1/3 dark:bg-gray-800`}
          tabIndex={-1}
          aria-labelledby="drawer-label"
        >
          <h2 className='text-center py-5'>
            <span className="text-2xl font-bold text-gray-50">Create your Account</span>
          </h2>
          <button
            type="button"
            onClick={() => setIsRegisterOpen(!isRegisterOpen)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <Form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4'>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>First name</label>
                <Field type="text" name="firstname" placeholder="First name" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="firstname" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Last name</label>
                <Field type="text" name="lastname" placeholder="Last name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="lastname" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Email</label>
                <Field type="email" name="email" placeholder="john.doe@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Phone number</label>
                <Field type="tel" name="phonenumber" placeholder="123-45-678" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="phonenumber" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Password</label>
                <Field type="password" name="password" placeholder="•••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Confirm Password</label>
                <Field type="password" name="confirmpassword" placeholder="•••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="confirmpassword" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Select User Type</label>
                <Field as="select"
          name="Usertype"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 foc us:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"    
      >
          <option value="">Select User Type</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </Field>
                <ErrorMessage name="Usertype" component="div" className="text-red-500" />
              </div>
              <div className="grid grid-cols-1 gap-4 text-center pt-5">
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">Register</button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterPage;

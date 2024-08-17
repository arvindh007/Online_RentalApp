import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import React from 'react'

function UpdateProfile() {
  const params = useParams();
  const navigate = useNavigate();
  let { state } = useLocation();
  console.log(state?.value?.record?.phonenumber, "))))");
  console.log(params?.id,'00@@@00');
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required *"),
    lastname: Yup.string().required("Lastname is required *"),
    email: Yup.string().email("Invalid email format *").required("Email is required *"),
    phonenumber: Yup.string().required("Phone number is required *")
  });

  return (
    <Formik
      initialValues={{
        firstname: state?.value?.record?.firstname || "",
        lastname: state?.value?.record?.lastname || "",
        email: state?.value?.record?.email || "",
        phonenumber:  state?.value?.record?.phonenumber || "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const DATA = {
          email: values.email,
          firstname: values.firstname,
          lastname: values.lastname,
          phonenumber: values.phonenumber,
          IS_Seller: state?.value?.record?.IS_Seller,
          password: state?.value?.record?.password,
          _id: state?.value?.record?._id,
        };
        try {
          const response = await fetch(
            `http://localhost:5001/api/updateprofile/${params.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(DATA),
            }
          );
            toast.success("Profile Updated Successfully");
            navigate(-1);   
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;
                console.log('response error', errorData);
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
    <div className="m-6 ">
      <div className="flex justify-between ">
        <div className="flex p-4 gap-3 ">
         {
          state?.value?.record?.IS_Seller ?
          (
<span className="bg-gray-100 text-green-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-green-700 dark:text-white border border-gray-500 ">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
            Seller
          </span>

          ):(

<span className="bg-gray-100 text-green-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-blue-700 dark:text-white border border-gray-500 ">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
            Buyer
          </span>
          )
         } 
          <h2 className="text-xl capitalize font-medium text-gray-800 ">
            user Profile Details
          </h2>
        </div>
        <div className=" flex gap-1 p-4 cursor-pointer " onClick={() => handleSubmit()}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-blue-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
              clip-rule="evenodd"
            />
          </svg>

          <h1 className="text-sm font-medium text-blue-800 ">Update Profile</h1>
        </div>
      </div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* <!-- Profile --> */}
      <div className="m-5">
        <div className="m-10">
          <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">First name</label>
          <Field type="text" name="firstname" placeholder={"Anbuvel"} className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          
          />
          <ErrorMessage name="firstname" component="div" className="text-red-500" />
        </div>
        <div className="m-10">
          <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">Last name</label>
          <Field type="text" name="lastname" placeholder={"Anbuvel"} className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          />
          <ErrorMessage name="lastname" component="div" className="text-red-500 mt-5 text-xl" />
        </div>
        <div className="m-10">
          <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">email id</label>
          <Field type="email" name="email" placeholder={"Anbuvel"} className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>
        <div className="m-10">
          <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">Phone number</label>
          <Field type="tel" name="phonenumber" placeholder={"Anbuvel"} className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          />
          <ErrorMessage name="phonenumber" component="div" className="text-red-500" />
        </div>
      </div>
    </div>
      )}
    </Formik>
  )
}

export default UpdateProfile
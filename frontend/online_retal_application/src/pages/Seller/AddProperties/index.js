import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import React, { useState } from "react";

function AddProperty() {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    porperty_name: Yup.string().required("Property name is required *"),
    porperty_description: Yup.string().required("Property description is required *"),
    porperty_price: Yup.string().required("Property price is required *"),
    porperty_Type: Yup.string().required("Porperty Type is required *"),
    porperty_image: Yup.array().min(1, "At least one image is required *"),
    Address: Yup.string().required("Address is required *"),
    city: Yup.string().required("City is required *"),
    nearby_landmark: Yup.string().required("Nearby Landmark is required *"),
    State: Yup.string().required("State is required *"),
    country: Yup.string().required("Country is required *"),
    Pincode: Yup.string().required("Pincode is required *"),
  });
  const handleFileChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files.map((file) => URL.createObjectURL(file)));
    setFieldValue("porperty_image", files.map((file) => URL.createObjectURL(file)));
  };
  const User_id = localStorage?.getItem("user_id")
  const USERDATA = localStorage.getItem("user");
  const USERDETAILS = JSON.parse(USERDATA)
  return (
    <Formik
      initialValues={{
        porperty_name: "",
        porperty_description: "",
        porperty_price: "",
        porperty_image: [],
        porperty_Type: "",
        Address: "",
        city:"",
        nearby_landmark: "",
        State:"",
        country:"",
        Pincode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        // Log the values to the console on submit
        console.log(values);

        const DATA = {
          porperty_name: values.porperty_name,
          porperty_description: values.porperty_description,
          porperty_price: values.porperty_price,
          porperty_image: values.porperty_image,
          porperty_Type: values.porperty_Type,
          Address: values.Address,
          city: values.city,
          nearby_landmark: values.nearby_landmark,
          State: values.State,
          country: values.country,
          pincode: values.Pincode,
          user_data :USERDETAILS
        }

        try {
          const response = await axios.post("http://localhost:5001/api/createproperty", DATA, {
            headers: {
              "Content-Type": "application/json",
            },
          });
            toast.success("Property added successfully");  
            navigate (`/Propertylist/${User_id}`)            
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
      {({ handleSubmit, setFieldValue, values }) => (
        <div className="m-6 ">
          <div className="flex justify-between ">
            <div className="flex p-4 gap-3 ">
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
              <h2 className="text-xl capitalize font-medium text-gray-800 ">
                Add Property
              </h2>
            </div>
            <div
              className=" flex gap-1 p-4 cursor-pointer "
              onClick={() => handleSubmit()}
            >
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
                  d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                  clip-rule="evenodd"
                />
              </svg>
              <h1 className="text-sm font-medium text-blue-800 capitalize ">
                upload property
              </h1>
            </div>
          </div>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
          {/* <!-- Profile --> */}
          <div className="m-5">
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
                porperty_name:
              </label>
              <Field
                type="text"
                name="porperty_name"
                placeholder={"The Boys House"}
                className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="porperty_name"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
                porperty_description:
              </label>
              <Field
                as="textarea"
                name="porperty_description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></Field>
              <ErrorMessage
                name="porperty_description"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
                porperty Type:
              </label>
              <Field
                as="select"
                name="porperty_Type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 foc us:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Property Type</option>
                <option value="house">house</option>
                <option value="land">land</option>
              </Field>
              <ErrorMessage
                name="porperty_Type"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
                Property Image:
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                  />
                </label>
              </div>

              <ErrorMessage
                name="porperty_image"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />

              {/* Preview selected images */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {/* {console.log("selectedImages", selectedImages)} */}
                {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
                porperty_price:
              </label>
              <Field
                type="text"
                name="porperty_price"
                placeholder={"100000"}
                className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="porperty_price"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
              Address:
              </label>
              <Field
                type="Address"
                name="Address"
                placeholder={"Enter your Address"}
                className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="Address"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
              city:
              </label>
              <Field
                type="text"
                name="city"
                placeholder={"Enter your city"}
                className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
              nearby_landmark:
              </label>
              <Field
                type="text"
                name="nearby_landmark"
                placeholder={"Enter your nearby_landmark"}
                className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="nearby_landmark"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
              State:
              </label>
              <Field
                type="text"
                name="State"
                placeholder={"Enter your State"}
                className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="State"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
              country:
              </label>
              <Field
                type="text"
                name="country"
                placeholder={"Enter your country"}
                className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            <div className="m-10">
              <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">
              Pincode:
              </label>
              <Field
                type="text"
                name="Pincode"
                placeholder={"641606"}
                className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="Pincode"
                component="div"
                className="text-red-500 mt-5 text-xl"
              />
            </div>
            
          </div>
        </div>
      )}
    </Formik>
  );
}

export default AddProperty;

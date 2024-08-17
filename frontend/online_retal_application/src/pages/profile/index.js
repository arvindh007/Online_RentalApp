import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function Profile() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  console.log(params?.id,'0000');
  useEffect(() => {
    if(params?.id)
    {
      getsingelprofile()
    } 
  },[])
  const getsingelprofile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api//getsingleprofile/${params?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
      localStorage.setItem("user", JSON.stringify(data?.record));
      
      setLoading(false);
    } catch (error) {
      console.log(error, "Error Message");
    }
  };
   console.log(Data, "----EEE--");
   console.log(Data?.record?.firstname
    , "----EEE--");
   
  return (
    <div className="m-6 ">
      <div className="flex justify-between ">
        <div className="flex p-4 gap-3 ">
         {
Data?.record?.IS_Seller ? 
 (
  <span class="bg-gray-100 text-green-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-green-700 dark:text-white border border-gray-500 ">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
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
 ):(<span class="bg-gray-100 text-green-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-blue-700 dark:text-white border border-gray-500 ">
  <svg
    class="w-6 h-6 text-gray-800 dark:text-white"
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
</span>)

         } 
          <h2 className="text-xl capitalize font-medium text-gray-800 ">
            user Profile Details
          </h2>
        </div>
        <div className=" flex gap-1 p-4 cursor-pointer " onClick={() => navigate(`/updateProfile/${params?.id}`, { state: { value: Data } })}>
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

          <h1 className="text-sm font-medium text-blue-800 ">Edit Profile</h1>
        </div>
      </div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* <!-- Profile --> */}
      <div className="m-5">
        <div className="m-10">
          <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">First name</label>
          <input type="text" name="firstname" placeholder={`${Data?.record?.firstname ? Data?.record?.firstname : ""}`} className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          disabled
          />
        </div>
        <div className="m-10">
          <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">Last name</label>
          <input type="text" name="lastname" placeholder={`${Data?.record?.lastname ? Data?.record?.lastname : ""}`}
           className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          disabled
          />
        </div>
        <div className="m-10">
          <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">email id</label>
          <input type="text" name="firstname"placeholder={`${Data?.record?.email ? Data?.record?.email : ""}`} className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          disabled
          />
        </div>
        <div className="m-10">
          <label className="block mb-2 text-xl capitalize font-medium text-gray-900 dark:text-gray-900">Phone number</label>
          <input type="phone" name="firstname" placeholder={`${Data?.record?.phonenumber ? Data?.record?.phonenumber : ""}`}className="bg-gray-50 text-gray-900 text-xl rounded-lg focus:ring-blue-500 dark:bg-gray-200 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          disabled
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;

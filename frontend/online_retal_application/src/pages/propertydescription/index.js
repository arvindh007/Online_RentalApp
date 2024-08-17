import React, { useEffect, useState } from "react";
import PropertyDescriptionCarousel from "../../components/PropertyDescriptionCarousel";
import { useParams } from "react-router-dom";

function PropertyDescription() {
  const params = useParams();
  const [propertyData, setPropertyData] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const userid = JSON.parse(user_id);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/getSingleproperty/${params?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const data = await response.json();
      setPropertyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold dark:text-blue-800">
          Property Information
        </h2>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-white">
            <svg
              className="w-4 h-4 text-white dark:text-blue-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <PropertyDescriptionCarousel
          slides={[
            "https://i.pinimg.com/originals/5c/f5/31/5cf531acb6e5ceabe4956c9658ab16be.jpg",
          ]}
        />
      </div>
      <div className="text-center mt-5">
        <h2 className="text-3xl font-bold dark:text-blue-800">
          Property Details
        </h2>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-white">
            <svg
              className="w-4 h-4 text-white dark:text-blue-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="text-left mt-5 px-5 gap-10">
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          Property Name :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.property_name}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          Property Description :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.property_description}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          Property Price :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            ₹ {propertyData?.property_price}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          Property Type :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.property_Type}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          Address :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.Address}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          City :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.city}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          Nearby Landmark :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.nearby_landmark}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          State :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.State}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          Country :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.country}
          </span>
        </h1>
        <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
          Pincode :
          <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
            {propertyData?.pincode}
          </span>
        </h1>
      </div>

      {userid ? (
        <>
          <div className="text-center mt-5">
            <h2 className="text-3xl font-bold dark:text-blue-800">
              Property Owner
            </h2>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
              <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-white">
                <svg
                  className="w-4 h-4 text-white dark:text-blue-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 14"
                >
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-left mt-5 px-5 gap-10">
            <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
              First Name :
              <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
                {propertyData?.user_data?.firstname}
              </span>
            </h1>
            <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
              Last Name :
              <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
                {propertyData?.user_data?.lastname}
              </span>
            </h1>
            <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
              Phone Number :
              <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
                {propertyData?.user_data?.phonenumber}
              </span>
            </h1>
            <h1 className="text-3xl font-bold dark:text-gray-700 capitalize mb-5">
              Email ID :
              <span className="px-5 text-3xl font-bold dark:text-blue-800 capitalize">
                {propertyData?.user_data?.email}
              </span>
            </h1>
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <h2 className="text-2xl font-bold dark:text-red-600">
            To view property owner details, please <a href="/#" className="text-blue-500">log in</a> or <a href="/#" className="text-blue-500">sign up</a>.
          </h2>
        </div>
      )}
    </div>
  );
}

export default PropertyDescription;

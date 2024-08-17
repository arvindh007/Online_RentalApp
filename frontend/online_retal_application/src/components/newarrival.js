import React from "react";
import { useNavigate } from "react-router-dom";

const NewArrival = ({ data }) => {
  const navigate = useNavigate();

  // Check if the data prop is provided and contains the necessary fields
  if (!data) {
    return <p>No property data available</p>;
  }
  const { porperty_name, porperty_price, porperty_image } = data;

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" 
onClick={() => navigate(`/PropertyDescription/${data?._id}` , { state: { value: data } })}
    >
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
        //   src={porperty_image[0] || "https://i.pinimg.com/originals/5c/f5/31/5cf531acb6e5ceabe4956c9658ab16be.jpg"}
          src={"https://i.pinimg.com/originals/5c/f5/31/5cf531acb6e5ceabe4956c9658ab16be.jpg"}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white uppercase">
            {porperty_name || "Property Name Not Available"}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < 5 ? "text-yellow-300" : "text-gray-200 dark:text-gray-600"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5
          </span>
        </div>
        <div className="flex items-center justify-between">
          {/* Displaying Indian Rupee */}
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹ {porperty_price ? porperty_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Price Not Available"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;

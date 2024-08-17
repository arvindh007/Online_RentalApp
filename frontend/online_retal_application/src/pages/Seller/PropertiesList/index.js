import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/propertycard";
import axios from "axios";
import { toast } from "react-toastify";

function Propertylist() {
  const [perpertydata, setPerpertydata] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/getproperties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const data = await response.json();
      setPerpertydata(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteproperty = async (datas) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/deleteproperty/${datas?._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success("Property deleted successfully!");
          setPerpertydata(perpertydata.filter(item => item._id !== datas._id)); // Remove the deleted item from the state
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.log(error, "Error Message");
      }
    }
  };

  return (
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
            Your Property List
          </h2>
        </div>
      </div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/* list the properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5">
        {perpertydata?.map((product, index) => 
          product.user_id === localStorage.getItem("user_id") ? (
            <ProductCard
              key={index}
              image={product.porperty_image[0]}
              title={product.porperty_name}
              price={product.porperty_price}
              rating={4.8}
              reviews={120}
              data={product}
              deleteproperty={deleteproperty} // Pass the delete function as a prop
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Propertylist;

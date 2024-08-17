import { useEffect, useState } from "react";
import RegisterPage from "../register/register";
import LoginPage from "../login/login";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const userId = localStorage.getItem("user_id");
  const userType = JSON.parse(localStorage.getItem("user"));
  const userlogout = () =>{
    localStorage.clear();
    navigate('/');
    toast.success("Logout successfully");
    setInterval(() => { 
        window.location.reload();
    }, 5000);
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-blue-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"}>
        
        <a
          href=""
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Online Rental Application
          </span>
        </a>
        
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={
            !isOpen
              ? "hidden w-full md:block md:w-auto"
              : "w-full md:block md:w-auto"
          }
          id="navbar-default"
        >
          {/* Guest */}
          {userId ? (
            // check seller or buyer
            userType?.IS_Seller ? (
                // this is seller
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-blue-800 md:dark:bg-blue-800 ">
                <li onClick={() => navigate("/AddProperty")}>
                  <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-900" aria-current="page">Add Property</a>
                </li>
                <li onClick={() => navigate(`/Propertylist/${userType._id}`)}>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-blue-800 dark:hover:text-white md:dark:hover:bg-transparent">My Property</a>
                </li>
                <li onClick={()=> navigate(`/Profile/${userType._id}`, { state: { value: userType } })}>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</a>
                </li>
                <li 
                onClick={()=>userlogout()}
                >
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">logout</a>
                </li>
              </ul>
            ) : (
                // this is buyer
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-blue-800 md:dark:bg-blue-800 gap-10 ">
                <li onClick={()=> navigate(`/Profile/${userType._id}`, { state: { value: userType } })}>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Profile
                  </a>
                </li>
                <li 
                onClick={()=>userlogout()}
                >
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    logout
                  </a>
                </li>
              </ul>
            )
          ) : (
            // this is guest
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-blue-800 md:dark:bg-blue-800 gap-10 ">
              <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div className="flex">
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
                      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <h2
                    className="ms-3 cursor-pointer text-gray-50 capitalize "
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    login{" "}
                  </h2>
                  <span className="ms-3  text-gray-50">/</span>
                  <h2
                    className="ms-3 cursor-pointer text-gray-50 capitalize "
                    onClick={() => setIsRegisterOpen(!isRegisterOpen)}
                  >
                    register
                  </h2>
                </div>
              </div>
            </ul>
          )}
          {isDrawerOpen ?
            <LoginPage isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>: null   
         } 
          {isRegisterOpen ? (
            <RegisterPage
              isRegisterOpen={isRegisterOpen}
              setIsRegisterOpen={setIsRegisterOpen}
            />
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Header;

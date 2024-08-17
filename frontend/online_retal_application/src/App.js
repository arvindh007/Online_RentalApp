
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Wishlist from './pages/Buyer/MyWishlist/index.js';
import AddProperty from './pages/Seller/AddProperties';
import Propertylist from './pages/Seller/PropertiesList';
import UpdateProperty from './pages/Seller/UpdateProperties';
import Profile from './pages/profile';
import UpdateProfile from './pages/updateProfile';
import Footer from './pages/footer/index.js';
import PropertyDescription from './pages/propertydescription/index.js';

function App() {
  return (
    <>
    <BrowserRouter>
   <Layout/>
  <div>
  <Routes>
          <Route 
            path="/" 
            element={<Home/>} 
          />
          <Route 
            path="/Wishlist/:id" 
            element={<Wishlist/>} 
          />
          <Route 
            path="/AddProperty" 
            element={<AddProperty/>} 
          />
          <Route 
            path="/Propertylist/:id" 
            element={<Propertylist/>} 
          />
          <Route 
            path="/UpdateProperty/:id" 
            element={<UpdateProperty/>} 
          />
          <Route 
            path="/Profile/:id" 
            element={<Profile/>} 
          />
          <Route 
            path="/UpdateProfile/:id" 
            element={<UpdateProfile/>} 
          />
          <Route 
            path="/PropertyDescription/:id" 
            element={<PropertyDescription/>} 
          />
        </Routes>
    </div>
   <Footer/>
    
    </BrowserRouter>
  <ToastContainer />
  </>
  );
}

export default App;

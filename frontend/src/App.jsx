import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from './component/Footer/Footer';
import LoginPopUp from './component/LoginPopUp/LoginPopUp';
import Menu from './pages/Menu/Menu';
import OccasionMenu from './pages/OccasionMenu/OccasionMenu';
import PriceMenu from './pages/PriceMenu/PriceMenu';
import WishList from './pages/WishList/WishList';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  return (
    <>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} setShowForgetPassword={setShowForgetPassword} />}
      {showForgetPassword && <ForgetPassword setShowForgetPassword={setShowForgetPassword} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/occasions' element={<OccasionMenu />} />
          <Route path='/price' element={<PriceMenu />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

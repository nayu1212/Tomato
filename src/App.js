
import './App.css';
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Cart from './Pages/Cart/Cart'
import Home from './Pages/Home/Home'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react';
import LoginPopup from './components/LoginPopup/LoginPopup';

function App() {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="App">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
      <Route  path='/' element ={<Home/>}/>
      <Route  path='/cart' element ={<Cart/>}/>
      <Route  path='/order' element ={<PlaceOrder/>}/>

        </Routes>
        

    </div>
    <Footer/></>
    
  );
}

export default App;

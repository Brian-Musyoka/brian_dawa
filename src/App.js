import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GetProductsComponent from './components/GetProductsComponent';
import AddProductsComponent from './components/Addproducts';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavbarComponent from './components/NavbarComponent';
import CartComponent from "./components/CartComponent";

import { Toaster } from "react-hot-toast";
import MakePaymentComponent from './components/MakePaymentComponent';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


function App() {
   const [cartItems, setCartItems] = useState([]);
     const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id);

      if (exists) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };
  return (
    <BrowserRouter>
    <div className="container-fluid">
    <div className="App">
      <Toaster position="top-right" />
      <NavbarComponent cartItems={cartItems} />
      
    <header className='App-header'>
      <h1>Brian-Motors</h1>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      </header>
      <Routes>
        <Route path='/' element ={<GetProductsComponent/>}/>
        <Route path='/Addproducts' element ={<AddProductsComponent/>}/>
        <Route path='/SignIn' element ={<SignInComponent/>}/>
        <Route path='/signUp' element ={<SignUpComponent/>}/>
        <Route path= "/makepayment" element={<MakePaymentComponent/>}/>
        <Route
          path="/cart"
          element={<CartComponent />}/>
      
      </Routes>
  
    </div>
    </div>
    </BrowserRouter>
    
  );
}

export default App;

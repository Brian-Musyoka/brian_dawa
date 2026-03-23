import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GetProductsComponent from './components/GetProductsComponent';
import AddProductsComponent from './components/AddproductsComponent';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavbarComponent from './components/NavbarComponent';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavbarComponent/>
      
    <header className='App-header'>
      <h1>Brian</h1>
      </header>
      <Routes>
        <Route path='/' element ={<GetProductsComponent/>}/>
        <Route path='/Addproducts' element ={<AddProductsComponent/>}/>
        <Route path='/SignIn' element ={<SignInComponent/>}/>
        <Route path='/signUp' element ={<SignUpComponent/>}/>
      </Routes>
  
    </div>
    </BrowserRouter>
    
  );
}

export default App;

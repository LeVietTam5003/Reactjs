import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Blog from './Componets/Blog/Index';
import Detail from './Componets/Blog/Detail';
import Login from './Componets/Member/Index'
import Contact from './Componets/Layout/Contact';
import Account from './Componets/Account/Account';
import Myproduct from './Componets/Product/Myproduct';
import Update from './Componets/Account/Update';
import AddProduct from './Componets/Product/Addproduct';
import Edit from './Componets/Product/Edit';
import Home from './Componets/Home/Home';
import ProductDetail from './Componets/Home/ProductDetail';
import Cart from './Componets/Cart/Cart';
// import Register from './Componets/Member/Register'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <App >  
        <Routes>  
          <Route exact path='/' element={<Home/>}/>  
          <Route path='/Login' element={<Login/>}/>        
          <Route path='/blog/list' element={<Blog/>}/>   
          <Route path='/blog/detail/:id' element={<Detail/>}/> 
          <Route path='/productdetail/:id' element={<ProductDetail/>}/>
          <Route path='/contact' element={<Contact/>}/> 
          <Route path='/account/addproduct' element={<AddProduct/>}/> 
          <Route path='/account/update' element={<Update/>}/>
          <Route path='/account/myproduct' element={<Myproduct/>}/> 
          <Route path='/account/myproduct/edit/:id' element={<Edit/>}/> 
          <Route path='/cart' element={<Cart/>}/> 
          <Route path='/account' element={<Account/>}/> 
        </Routes>
        </App> 
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

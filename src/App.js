import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
//functions
import { currentUser } from "./components/functions/auth";

//redux
import { useDispatch } from 'react-redux';
//Pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";
import Article from "./components/pages/Article"
import ArticleRead from "./components/pages/ArticleRead";
import Aboutus from "./components/pages/Aboutus";
import Aboutus2 from "./components/pages/Aboutus2";
//drawer
import DrawerSide from "./components/drawer/DrawerSide";

//Layouts
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



//pagesAdminProduct
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
//pageAdminCategory
import UpdateCategory from "./components/pages/admin/category/UpdateCategory";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import HomeAdmin from './components/pages/admin/Home';
import ManageAdmin from "./components/pages/admin/ManageAdmin"
import Orders from "./components/pages/admin/Orders";
import OrdersProof from "./components/pages/admin/OrdersProof"
//pages admin article
import ManageArticle from "./components/pages/admin/article/ManageArticle";
import CreateArticle from "./components/pages/admin/article/CreateArticle";
import EditArticle from "./components/pages/admin/article/EditArticle";




//pagesUser
import HomeUser from './components/pages/user/Home';
import Checkout from "./components/pages/Checkout";
import WishList from "./components/pages/user/WishList";
import History from "./components/pages/user/History";
import Profile from "./components/pages/user/Profile";
import ProofSend from "./components/pages/user/ProofSend";


//Routes
import UserRoutes from "./components/routes/UserRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";

function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  const backgroundmain = true;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code
        //console.log(res.data);
        dispatch({
          type: 'LOGIN',
          payload: {
            token: idtoken,
            _id: res.data._id,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (
    <div className="App" style={{height:'100%', backgroundColor: '#ECECEC'}}>
      <ToastContainer />
      <Navbar />
      <DrawerSide />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/article" element={<Article />} />
        <Route path="/article/:id" element={<ArticleRead />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/about-us2" element={<Aboutus2 />} />




        <Route path="/admin/index" element={
          <AdminRoutes>
            <HomeAdmin />
          </AdminRoutes>} />

        <Route path="/admin/manage-admin" element={
          <AdminRoutes>
            <ManageAdmin />
          </AdminRoutes>} />

        <Route path="/admin/create-category" element={
          <AdminRoutes>
            <CreateCategory />
          </AdminRoutes>} />

        <Route path="/admin/update-category/:id" element={
          <AdminRoutes>
            <UpdateCategory />
          </AdminRoutes>} />

        <Route path="/admin/create-product" element={
          <AdminRoutes>
            <CreateProduct />
          </AdminRoutes>} />

        <Route path="/admin/update-product/:id" element={
          <AdminRoutes>
            <UpdateProduct />
          </AdminRoutes>} />

        <Route path="/admin/orders" element={
          <AdminRoutes>
            <Orders />
          </AdminRoutes>} />
        <Route path="/admin/orders-proof/:id" element={
          <AdminRoutes>
            <OrdersProof />
          </AdminRoutes>} />



        <Route path="/admin/article" element={
          <AdminRoutes>
            <ManageArticle />
          </AdminRoutes>} />
        <Route path="/admin/article/create" element={
          <AdminRoutes>
            <CreateArticle />
          </AdminRoutes>} />
        <Route path="/admin/article/edit/:id" element={
          <AdminRoutes>
            <EditArticle />
          </AdminRoutes>} />




        <Route path="/user/index" element={
          <UserRoutes>
            <HomeUser />
          </UserRoutes>
        } />
        <Route path="/checkout" element={
          <UserRoutes>
            <Checkout />
          </UserRoutes>
        } />
        <Route path="/user/wishlist" element={
          <UserRoutes>
            <WishList />
          </UserRoutes>
        } />
        <Route path="/user/history" element={
          <UserRoutes>
            <History />
          </UserRoutes>
        } />
        <Route path="/user/profile" element={
          <UserRoutes>
            <Profile />
          </UserRoutes>
        } />
        <Route path="/user/proof/:id" element={
          <UserRoutes>
            <ProofSend />
          </UserRoutes>
        } />
        <Route path="/user/proofs/:id" element={
          <UserRoutes>
            <OrdersProof />
          </UserRoutes>
        } />



      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

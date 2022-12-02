import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
//router
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Search from '../card/Search';
import { ShoppingCartOutlined } from '@ant-design/icons';




const Navbar = () => {
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
  console.log("user Navbar", user);




  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };
  return (
    <>

      <nav className="navbar navbar-expand-lg" style={{ fontFamily: "Prompt", fontWeight: 'bold', backgroundColor: '#557153', fontSize: '20px' }}>
        <div className="container-fluid text-white">
          <a className="navbar-brand " href="/" style={{}}><img src={process.env.PUBLIC_URL + '/images/durianlogo2.png'} height="70" width="140" alt="" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="/">หน้าหลัก</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/shop">สินค้า</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/article">บทความ</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  เกี่ยวกับ
                </a>
                <ul className="dropdown-menu ">
                  <li><a className="dropdown-item" href="/about-us">เกี่ยวกับร้าน</a></li>
                  <li><a className="dropdown-item" href="/about-us2">เกี่ยวกับผู้จัดทำ</a></li>
                </ul>
              </li>


            </ul>

            <ul className="navbar-nav  ml-auto mb-lg-0">

              <span className="d-flex" role="search">
                <Search />
              </span>


              {!user && (
                <>
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link text-white" href="/login">เข้าสู่ระบบ</a>
                    </li>

                    <li className="nav-item pe-3">
                      <a className="nav-link text-white" href="/register">สมัคร</a>
                    </li>

                  </ul>
                </>
              )}

              {user && (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {user.username}
                    </a>
                    <ul className="dropdown-menu">
                      {user.role == 'admin'
                        ? (<li><a className="dropdown-item" href="/admin/index">แดสบอร์ด</a></li>)


                        : (<><li><a className="dropdown-item" href="/user/profile">บัญชีของฉัน</a></li>
                          <li><a className="dropdown-item" href="/user/wishlist">สินค้าที่สนใจ</a></li>
                          <li><a className="dropdown-item" href="/user/history">ประวัติคำสั่งซื้อ</a></li></>)

                      }
                      <hr/>
                      <li><a className="dropdown-item" onClick={logout}>ออกจากระบบ</a></li>
                    </ul>

                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="about-us">เกี่ยวกับร้าน</a></li>
                      <li><a className="dropdown-item" href="about-us2">เกี่ยวกับผู้จัดทำ</a></li>
                    </ul>
                  </li>

                </>
              )}
              <li className="nav-item">
                <a className="nav-link " href="/cart"> <Badge count={cart.length}><ShoppingCartOutlined className='text-white' style={{ fontSize: '30px' }} /></Badge></a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
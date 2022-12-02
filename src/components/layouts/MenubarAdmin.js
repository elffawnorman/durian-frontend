import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserOutlined ,
} from '@ant-design/icons';
const MenubarAdmin = () => {

  const { user, cart } = useSelector((state) => ({ ...state }));

  return (
    <nav>
      <ul className='nav flex-column pt-4'>

        <li className='nav-item'>
          <div className="card mb-3" style={{ maxWidth: "540px",backgroundColor:'#557153'}}>
            <div className="row g-0 text-white">
              <div className="col-md-4 align-self-center text-center " >
                <UserOutlined  style={{ fontSize: '48px' }} />
              </div>
              <div className="col-md-8">
                <div className="card-body ">
                  <h5 className="card-title text-white">{user.username}</h5>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className='nav-item'><a href="/admin/orders" style={{ textDecoration: 'none' }}><button className='button-5'>จัดการคำสั่งซื้อ</button></a></li>
        <li className='nav-item'><a href="/admin/index" style={{ textDecoration: 'none' }}><button className='button-5'>แก้ไขสินค้า</button></a></li>
        <li className='nav-item'><a href="/admin/create-product" style={{ textDecoration: 'none' }}><button className='button-5'>เพิ่มสินค้า</button></a></li>
        <li className='nav-item'><a href="/admin/create-category" style={{ textDecoration: 'none' }}><button className='button-5'>เพิ่มหมวดหมู่สินค้า</button></a></li>
        <li className='nav-item'><a href="/admin/article" style={{ textDecoration: 'none' }}><button className='button-5'>บทความ</button></a></li>
        <li className='nav-item'><a href="/admin/manage-admin" style={{ textDecoration: 'none' }}><button className='button-5'>จัดการผู้ใช้งาน</button></a></li>
      </ul>
    </nav >
  );
};

export default MenubarAdmin;
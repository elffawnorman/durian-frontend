import React from 'react';
import { Link } from 'react-router-dom';

const MenubarUser = () => {
  return (
    <nav className='mt-4'>
      <ul className="list-group list-group-flush h5">
        <li className="list-group-item"><a href="/user/profile" className='text-black'>โปรไฟล์</a></li>
        <li className="list-group-item"><a href="/user/wishlist" className='text-black'>สินค้าที่สนใจ</a></li>
        <li className="list-group-item"><a href="/user/history" className='text-black'>ประวัติคำสั่งซื้อ</a></li>
      </ul>
    </nav>
  );
};

export default MenubarUser;
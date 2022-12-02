import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//function
import { getUserCart, saveAddress, saveOrder, emptyCart } from '../functions/users'
import {NumericFormat,PatternFormat} from'react-number-format'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'; //ES6
import 'react-quill/dist/quill.bubble.css'

const Checkout = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false)



  useEffect(() => {
    getUserCart(user.token)
      .then(res => {
        console.log(res.data)
        setProducts(res.data.products)
        setTotal(res.data.cartTotal)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const handleSaveAddress = () => {
    console.log(address)
    saveAddress(user.token, address)
      .then(res => {
        console.log(res.data)
        if (res.data.ok) {
          toast.success("บันทึกที่อยู่สำเร็จ")
          setAddressSaved(true)
        }
      })
  }

  const handleCreateOrder = () => {
    saveOrder(user.token)
      .then((res) => {
        console.log(res.data)
        //เคลียร์ข้อมูลใน dataBase cart
        emptyCart(user.token)
        //เคลียร์ store
        dispatch({
          type: 'ADD_TO_CART',
          payload: []
        })
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart')
        }
        toast.success("ยืนยันคำสั่งซื้อสำเร็จ")
        navigate('/user/history')
      })
  }

  return (
    <div className='container p-5 mt-4 mb-4 bg-light rounded-3'>
      <div className='row'>
        <div className='col-md-6'>
          <h4>ที่อยู่</h4>
          <hr />
          <ReactQuill placeholder='ที่อยู่' className='card' theme={"bubble"}   value={address} onChange={setAddress} />
          <button className='btn btn-primary mt-2 mb-4' onClick={handleSaveAddress}>บันทึกที่อยู่</button>
          {/* <p className='h4'>ข้อมูลผู้ซื้อ</p>
          <p className='h5'><span>ชื่อ-นามสกุล{user.firstname}</span></p> */}
        </div>
        <div className='col-md-6'>
          <h4><strong>สรุปคำสั่งซื้อ</strong></h4>
          <hr /><p className='h4'>สินค้าจำนวน  {products.length}</p>
          <hr /><p className='h4'>รายการสินค้า</p>
          {products.map((item, i) =>
            <ul key={i}>
              <li><p className='h5'>
                {item.product.title} x {item.count} = <NumericFormat thousandSeparator=',' displayType='text' value={item.price * item.count}/>
              </p></li>
            </ul>
          )}
          <hr />
          <br />
          <h4>รวม :  <span><b><NumericFormat thousandSeparator=',' displayType='text' value={total}/>.00</b></span> บาท</h4>
          <hr />
          <br />
          <button
            onClick={handleCreateOrder}
            disabled={!addressSaved || !products.length} className='btn btn-primary '>ยืนยันสั่งซื้อ</button>

          <p hidden={addressSaved} className='text-decoration-underline text-danger'>*โปรดใส่ที่อยู่</p>

        </div>
      </div>
    </div>
  )
}

export default Checkout
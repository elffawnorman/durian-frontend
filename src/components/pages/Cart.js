import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProductInTableCart from '../card/ProductInTableCart'
import {NumericFormat,PatternFormat} from'react-number-format'

import { userCart } from '../functions/users'
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, user } = useSelector((state) => ({ ...state }))

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const handleOrder = () => {
        alert('ยืนยันคำสั่งซื้อแล้ว')
        userCart(user.token, cart)
            .then(res => {
                console.log(res)
                navigate('/checkout')
            }).catch(err => {
                console.log(err)
            })
    }

    const showCartItem = () =>
        <table className='table table-success table-striped'>
            <thead>
                <tr>
                    <th>รูปสินค้า</th>
                    <th>ชื่อสินค้า</th>
                    <th>ขนาด</th>
                    <th>ราคา</th>
                    <th>จำนวน(/กิโลกรัม)</th>
                    <th>ยกเลิกสินค้า</th>
                </tr>
            </thead>
            {cart.map((item) =>
                <ProductInTableCart key={item._id} item={item} />
            )}
        </table>


    return (
        <div style={{ marginBottom: 500 }}>
            <div className='container p-5 mt-4 mb-4 bg-light rounded-3'  >
                <div className='row' >
                    <div className='col-md-8'>
                        <h4>ตะกร้า / จำนวน {cart.length} ชนิด</h4>
                        {!cart.length
                            ? <p>ไม่มีสินค้าในตะกร้า</p>
                            : showCartItem()
                        }
                    </div>
                    <div className='col-md-4' >
                        <p className='h4'> สรุปผล</p>
                        <hr />
                        {cart.map((item, index) =>
                            <p key={index} className='h5'>
                                {item.title} x {item.count} = <NumericFormat thousandSeparator=',' displayType='text' value={item.price * item.count}/>
                            </p>
                        )}
                        <hr />
                        <p className='h4'>รวม : <span className='h4'><NumericFormat thousandSeparator=',' displayType='text' value={getTotal()} />.00 บาท</span></p>

                        <hr />
                        {user
                            ? <button className='btn btn-success' disabled={!cart.length} onClick={handleOrder}>ยืนยันคำสั่งซื้อ</button>
                            : <button className='btn btn-success ' ><Link to='/login' state="cart" className='text-decoration-none text-white'>เข้าสู่ระบบเพื่อเช็คเอาท์</Link></button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart
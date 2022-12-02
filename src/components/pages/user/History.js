import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MenubarUser from '../../layouts/MenubarUser'
import { getOrders } from '../../functions/users'

import Invoice from '../../order/Invoice'

const History = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [orders, setOrders] = useState([])
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getOrders(user.token)
            .then(res => setOrders(res.data))
    }



    return (
        <div className='container pt-5'>
            <div className='row'>
                <div className="col-md-2">
                    <MenubarUser />
                </div>
                <div className="col text ">
                    <div className='row p-5 mt-4 mb-4 bg-light rounded-3' >
                        <h1>ประวัติคำสั่งซื้อ</h1>
                        {orders.map((item, index) => {
                            console.log("item", item)
                            return <div key={index} className='card m-3'>
                                <p className='h5 bg-success text-white p-3 mt-3'> <strong>คำสั่งซื้อ</strong>{' ' + item.orderstatus} </p>
                                <table className='table table-success table-striped'>

                                    <thead>
                                        <tr>
                                            <th>ชื่อสินค้า</th>
                                            <th>จำนวน</th>
                                            <th>ราคา</th>

                                        </tr>
                                    </thead>
                                    {item.products.map((p, i) =>
                                        <tbody>
                                            <tr>
                                                <td>{p.product.title}</td>
                                                <td>{p.count}</td>
                                                <td>{p.price}</td>
                                            </tr>
                                        </tbody>
                                    )}
                                    <tbody>
                                        <tr className="table-active h4">
                                            <th colSpan={2}>รวมทั้งหมด :</th>
                                            <th >{item.cartTotal}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='row p-2'>
                                    <div className='col'>
                                        <Invoice order={item} />
                                    </div>
                                    <div className='col '>
                                        <a href={'/user/proof/'+item._id } orders={item._id}><button orders={item._id}  className='btn btn-success float-end' >แจ้งชำระเงิน</button></a>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default History
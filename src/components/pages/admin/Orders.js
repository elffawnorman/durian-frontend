import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';
import { useSelector } from 'react-redux'
import moment from 'moment/min/moment-with-locales';

//function
import { getOrders } from '../../functions/users'
import { updateStatusOrder, getOrdersAdmin } from '../../functions/admin'
//notify
import { toast, toastify } from 'react-toastify';
import { PatternFormat, NumericFormat } from 'react-number-format';


const Orders = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [orders, setOrders] = useState([])





    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getOrdersAdmin(user.token)
            .then(res => {
                setOrders(res.data)
            })
    }
    // console.log(orders)

    const handleChangeStatus = (orderId, orderstatus) => {
        updateStatusOrder(user.token, orderId, orderstatus)
            .then(res => {
                console.log(res.data)
                toast.info(res.data.orderstatus)
                loadData();
            })
    }


    const tableOrder = <table className="table table-success table-striped">
        <thead>
            <tr>
                <th scope="col">หมายเลขคำสั่งซื้อ</th>
                <th scope="col">ชื่อผู้ใช้</th>
                <th scope="col">รายการสินค้า</th>
                <th scope="col">รวมยอด (บาท)</th>
                <th scope="col">สภานะการแจ้งโอนเงิน</th>
                <th scope="col">อัพเดตสถานะ</th>
                <th scope="col">ตรวจสอบการโอนเงิน</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((item, i) => (
                <tr key={i}>
                    <th scope="row">{item._id}</th>
                    <th scope="row">{item.orderdBy.username}</th>
                    <td>
                        <ol key={item.products}>{item.products.map((p) =>
                            <li key={p.product.title}>{p.product.title} {' '} <b>{p.price}x{p.count}</b></li>
                        )}
                        </ol>
                    </td>
                    <td><NumericFormat thousandSeparator=',' displayType='text' value={item.cartTotal} /></td>
                    {item.dateProof == null
                        ? <td>ยังไม่ส่งหลักฐาน</td>
                        : <td >ส่งเมื่อ <br />{moment(item.dateProof).locale('th').format('ll')} </td>}
                    <td>{item.orderstatus}
                    </td>
                    <td>
                        {item.dateProof == null
                            ?<button className='btn btn-success' disabled='true' >ตรวจสอบ</button>
                            :< a href={'/admin/orders-proof/' + item._id} orders={item}><button className='btn btn-success' >ตรวจสอบ</button></a>
                        }
                    </td>
                </tr>

            ))}

        </tbody>
    </table >

    return (
        <div className='container-fluid'>
            <div className='row'>

                <div className="col-md-2">
                    <MenubarAdmin />
                </div>

                <div className="col" >
                    <div className='container p-5 mt-4 mb-4 bg-light rounded-3'>
                        <h1 className='pt-3'>คำสั่งซื้อของลูกค้า</h1>
                        {tableOrder}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Orders
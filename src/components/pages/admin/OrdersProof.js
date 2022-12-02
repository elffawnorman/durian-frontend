import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { getOrdersAdmin, readProof } from '../../functions/admin';
import moment from 'moment/min/moment-with-locales';
import { updateStatusOrder } from '../../functions/admin';
import { toast, toastify } from 'react-toastify';
import Item from 'antd/lib/list/Item';


const OrdersProof = () => {
  const params = useParams()
  const { user } = useSelector((state) => ({ ...state }))
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    console.log(orders)
    getOrdersAdmin(user.token)
    readProof(params.id)
      .then(res => {
        setOrders(res.data)
      }).catch(err => {
        //
        console.log(err.response);
      });
  };
  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus)
      .then(res => {
        console.log(res.data)
        alert('คุณได้เปลี่ยนแปลงสถานะคำสั่งซื้อเป็น'+orderstatus)
        loadData();
      })
  }
  const onClickleave = () => {
    navigate('/admin/orders')
  }
  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <MenubarAdmin />

          </div>
          <div className='col p-5 mt-4 mb-4 bg-light rounded-3'>
            <h1>ตรวจสอบการโอนเงิน</h1>
            <div className='row'>
              <p className='h4'>คำสั่งซื้อเลขที่ <span className='text-success'>{orders._id}</span></p>
              <p className='h4'>รหัสลูกค้า <span className='text-success'>{orders.orderdBy}</span></p>
              
             
            </div>
            <div className='row'>
              <div className='col-md-4 card p-4'>
                <p className='h4'>สลิปโอนเงินจากลูกค้า</p>
                {orders.images && orders.images.map(orders => <img width='500' key={orders.public_id} src={orders.url} />)}
              </div>
              
              <div className='col-md-6 card'>
                <div className='row'>
                  <div className='col'>
                    <p className='h4 bg-success text-white p-3 mt-3'>สถานะคำสั่งซื้อ </p>
                    <hr/>
                    <p className='h4 mt-2'><strong>ยอดสั่งซื้อ</strong>    </p>
                    <p className='h5 mt-2'><strong>เวลาที่โอน </strong>   </p>
                    <p className='h5 mt-2'><strong>วันที่โอน  </strong>  </p>
                  </div>
                  <div className='col'>
                    <p className='h4  text-black p-3 mt-3'>{orders.orderstatus}</p>
                    <hr/>
                    <p className='h4 ms-3'>{orders.cartTotal} บาท</p>
                    <p className='h5 ms-3'>{orders.timeProof} น.</p>
                    <p className='h5 ms-3'>{moment(orders.dateProof).locale('th').format('ll')}</p>
                  </div>
                </div>
                <hr/>
                <div className='row mt-2'>
                  <span ><p className='h5'>ยืนยันสถานะคำสั่งซื้อ</p>
                    <select value={orders.orderstatus} key={orders._id}
                      onChange={(e) => handleChangeStatus(orders._id, e.target.value)}
                      style={{ width: "200px", alignSelf: 'center' }} className="form-select">
                      <option  value="ยังไม่ดำเนินการ">ยังไม่ดำเนินการ</option>
                      <option value="ตรวจสอบแล้ว">ตรวจสอบแล้ว</option>
                      <option value="สำเร็จ พร้อมจัดส่ง">สำเร็จ พร้อมจัดส่ง</option>
                      <option value="ยกเลิก">ยกเลิก</option>

                    </select>

                    <button className='float-end me-2 btn btn-secondary' onClick={onClickleave}>ออก</button>
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersProof
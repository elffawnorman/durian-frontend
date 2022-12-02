import React, { useState, useEffect } from 'react'
import FileUpload from '../admin/product/FileUpload'
import { useSelector } from 'react-redux';
import { proofSend, readProof } from '../../functions/users';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { getOrders } from '../../functions/users';
import { NumericFormat, PatternFormat } from 'react-number-format'

const initialstate = {
  timeProof: "",
  dateProof: "",
  images: [],
}

const ProofSend = () => {
  const params = useParams()
  const { user } = useSelector((state) => ({ ...state }))
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [values, setValues] = useState(initialstate)
  const [loading, setLoading] = useState(false)

  // const {_id,cartTotal} = orders

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    proofSend(user.token, values._id, values)
      .then((res) => {
        console.log(res)
        toast.success('ส่งหลักฐานสำเร็จ')
        window.location.reload()
      }).catch((err) => {
        console.log(err.response.data)
        toast.error('ส่งหลักฐานไม่สำเร็จ')
      })
  };

  useEffect(() => {
    loadData(user.token);
  }, [])

  const loadData = () => {
    readProof(params.id)
      .then(res => {
        //
        setValues({ ...values, ...res.data })
      }).catch(err => {
        //
        console.log(err.response);
      });
  };
  console.log(values)
  return (
    <div className='container pt-5'>
      <div className='row p-5 mt-4 mb-4 bg-light rounded-3' style={{}}>
        {loading
          ? <h1>Loading... <Spin /></h1>
          : <h1>แจ้งชำระเงิน</h1>}
        <hr />

        <div className='row pt-5'>
          <div className='col-md'>
            <div className='row card-start'>
              <div className='col-6'>
                <p className='h4 text-success'><strong>ธนาคารกสิกรไทย</strong></p>
                <p className='h4'>ชื่อบัญชี  <span className='text-success'>ทุเรียน เทส กู๊ด </span>   </p>
                <p className='h4'>เลขที่บัญชี  <span className='text-success'>000000000</span>     </p>
              </div>
              <img className='img-thumbnail float-end' style={{ width: "150px" }} src='/images/kbank.png' />
            </div>
          </div>
          <div className='card p-2 mt-3 mb-4'>
            <p className='h5'>#คำสั่งซื้อเลขที่ <u >{values._id}</u></p>


            <p className='h3'>ยอดสั่งซื้อ <u><NumericFormat thousandSeparator=',' displayType='text' value={values.cartTotal} /></u> บาท</p>
          </div>
        </div>
        <div className='col-md'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <div className='col'>
                <FileUpload loading={loading} setLoading={setLoading} values={values} setValues={setValues} />
              </div>
              <div className='col'>
                <div class="input-group pt-3" >
                  <span class="input-group-text" id="inputGroup-sizing-default">ยอดโอนเงิน</span>
                  <NumericFormat
                    displayType='input'
                    thousandSeparator=','
                    name="totalTranfers"
                    className="form-control"
                    placeholder='ยอดเงินโอน' />
                </div>
                <div className='col-md-3'>
                  <div class="input-group pt-3" >
                    <span class="input-group-text" id="inputGroup-sizing-default">เวลาที่โอน</span> <input value={values.timeProof} name='timeProof' className='form-control' onChange={handleChange} type='time'></input>
                  </div>
                </div>
                <div class="input-group mt-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">วันที่โอนเงิน</span>
                  <input style={{ width: '250px' }} type="date" class="form-control" name='dateProof' value={values.dateProof}
                    onChange={handleChange} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
              </div>
            </div>

            <button className='btn btn-primary float-end mt-3'>ส่งหลักฐาน</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProofSend
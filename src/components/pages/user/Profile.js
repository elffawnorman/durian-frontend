import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import MenubarUser from '../../layouts/MenubarUser';
import { useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'; //ES6
import 'react-quill/dist/quill.snow.css' //ES6

import { readUserSingle, updateUserSingle } from '../../functions/users'



import 'react-quill/dist/quill.bubble.css'

import Meta from 'antd/lib/card/Meta'

const initialstate = {
  _id:"",
  username: "",
  firstname: "",
  lastname: "",
  address: "",
  email: "",
  tel: "",
}


const Profile = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state }));



  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initialstate)

  useEffect(() => {
    loadData(user.token)
    console.log(user._id)
  }, [])

  const loadData = (authtoken) => {
    readUserSingle(authtoken, user._id)
      .then((res) => {
        setValues({ ...values, ...res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value })

  };
//ยังไม่สามารถ แก้ใน database ได้
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    updateUserSingle(user.token, values, values._id)
      .then((res) => { 
        setLoading(false)
        toast.success('อัพเดตโปรไฟล์เสร็จสิ้น')
        console.log(res)
        // dispatch({
        //   type:'USER_DETAIL_SUCCESS'
        // })
      }).catch((err) => {
        setLoading(false)
        toast.error('แก้ไขไม่สำเร็จ')
        console.log(err.response)
      })

  };

  return (
    <>
      <div className='container pt-5'>
        <div className='row'>
          <div className='col-md-2'>
            <MenubarUser></MenubarUser>
          </div>

          <div className='col-md-10 p-5 mt-4 mb-4 bg-light rounded-3'>
            <h1 className='p-3' style={{ backgroundColor: '#8A9A5B' }}>โปรไฟล์</h1><br />
            <form onSubmit={handleSubmit}>


              <div className='row'>
                <div className='col-3'>
                  <label>ชื่อผู้ใช้</label>
                </div>
                <div className='col'>
                  <input type="text" name="username" className='form-control w-50' onChange={handleChange} value={values.username} />
                </div>
              </div>


              <div className='row pt-2'>
                <div className='col-3'>
                  <label>ชื่อ-นามสกุล</label>
                </div>
                <div className='col'>
                  <input type="text" name="firstname" className='form-control' onChange={handleChange} value={values.firstname} />
                </div>
                <div className='col'>
                  <input type="text" name="lastname" className='form-control' onChange={handleChange} value={values.lastname} />
                </div>
              </div>

              <div className='row pt-4'>
                <div className='col-3'>
                  <label>ที่อยู่</label>
                </div>
                <div className='col'>
                  <ReactQuill  value={values.address} />


                </div>
              </div>

              <div className='row pt-4'>
                <div className='col-3'>
                  <label>อีเมล</label>
                </div>
                <div className='col'>
                  <input type="email" onChange={handleChange} name="email" className='form-control w-50' value={values.email} />
                </div>
              </div>
              <div className='row pt-2 pb-2'>
                <div className='col-3'>
                  <label>เบอร์โทร</label>
                </div>
                <div className='col'>
                  <input type="text" name="tel" className='form-control w-50' onChange={handleChange} value={values.tel} />
                </div>
              </div>
              <hr />
              <button style={{ backgroundColor: '#8A9A5B' }} className='btn  ps-4 pe-4 text-white '>แก้ไข</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
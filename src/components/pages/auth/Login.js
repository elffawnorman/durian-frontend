import React, { useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

//functions
import { login } from "../../functions/auth";

// redux
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log('lo', location.state)

  const [value, setValue] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const roleBaseRedirect = (role) => {
    let intended = location.state
    if (intended) {
      navigate('../' + intended)
    } else {
      if (role === 'admin') {
        navigate("/admin/orders");
      } else {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    console.log(value);

    login(value)
      .then((res) => {
        setLoading(false)
        console.log(res.data);
        toast.success(res.data.payload.user.username + " เข้าสู่ระบบ");

        dispatch({
          type: 'LOGIN',
          payload: {
            token: res.data.token,
            _id: res.data.payload.user._id,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
            firstname: res.data.payload.user.firstname,
            lastname: res.data.payload.user.lastname,
            email: res.data.payload.user.email,
            tel: res.data.payload.user.tel,
            address: res.data.payload.user.address,
            createdAt: res.data.payload.user.createdAt
          },
        });
        localStorage.setItem('token', res.data.token)
        roleBaseRedirect(res.data.payload.user.role)

      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response.data)
        toast.error(err.response.data)
      });

  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <div className='container pt-5 mt-5' style={{marginBottom:350}}>
      <div className='row'>
        <div className='col-md-6 offset-md-3 p-5 mt-4 mb-4 bg-light rounded-3 '>
          {loading
            ? <h1>กำลังโหลด...<Spin indicator={antIcon} /></h1>
            : <h1>เข้าสู่ระบบ</h1>}
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>ชื่อผู้ใช้</label>
              <input className='form-control' type="text" name="username" onChange={handleChange} />
              <label>รหัสผ่าน</label>
              <input className='form-control' type="password" name="password" onChange={handleChange} />
              <button className="btn btn-success pl-2 pr-2 mt-3">เข้าสู่ระบบ</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Login
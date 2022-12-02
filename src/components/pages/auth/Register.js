//rafce
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { PatternFormat } from 'react-number-format';
//function
import { register } from '../../functions/auth'

const Register = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        tel: "",
        password: "",
        password1: ""
    });
    const handleChange = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value,
        });
    };
    //console.log(value)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(value)
        if (value.password !== value.password1) {
            toast.error("รหัสไม่ตรงกัน")
        } else {
            register(value)
                .then(res => {
                    console.log(res);
                    toast.success('สมัครสำเร็จ')
                    navigate('/login')

                })
                .catch((err) => {
                    console.log(err.response.data);
                    toast.error(err.response.data)
                });
        }
    };
    return (
        <div className='container pt-5 text-center mt-5'style={{marginBottom:180}}>
            <div className='row'>
                <div className='col-md-6 offset-md-3 p-5 mt-4 mb-4 bg-light rounded-3'>
                    <h1>สมัครสมาชิก</h1>

                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input placeholder='ชื่อผู้ใช้งาน' className='form-control' type="text" name="username" onChange={handleChange} />
                            <div className='row mt-2'>
                                <div className='col'>
                                    <input placeholder='ชื่อ' type="text" name="firstname" className='form-control' onChange={handleChange} />
                                </div>
                                <div className='col'>
                                    <input placeholder='นามสกุล' type="text" name="lastname" className='form-control' onChange={handleChange} />
                                </div>
                            </div>
                            <input type="email" placeholder='อีเมล' onChange={handleChange} name="email" className='mt-2 form-control'  />
                            <PatternFormat name="tel" placeholder='เบอร์โทร' className='form-control mt-2' onChange={handleChange} format="### ### ####"  />

                            <input className='form-control mt-2' placeholder='รหัสผ่าน' type="password" name="password" onChange={handleChange} />
                            <label hidden={value.password.length >= 6} className="text-danger">*รหัสจะต้องมี 6 ตัวอักษรขึ้นไป</label>
                            <br />
                            <input className='form-control' placeholder='ยืนยันรหัสผ่าน' type="password" name="password1" onChange={handleChange} />
                            <button  className="btn btn-success mt-4 " disabled={value.password.length < 6}>สมัครสมาชิก</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Register
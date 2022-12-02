import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../../layouts/MenubarAdmin';
import { useSelector } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import FileUpload from './FileUpload'
//function 
import { readProduct, updateProduct } from '../../../functions/product';
import { listCategory } from '../../../functions/category';

const initialstate = {
    title: "",
    description: "",
    size: "",
    categories: [],
    category: "",
    price: "",
    quantity: "",
    images: [],
}

const UpdateProduct = () => {

    const params = useParams()
    const navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state }))

    const [values, setValues] = useState(initialstate)
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        readProduct(params.id)
            .then((res) => {
                setValues({ ...values, ...res.data })
            }).catch((err) => {
                console.log(err)
            })
        listCategory(user.token)
            .then((res) => {
                setCategory(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    console.log("values", values)
    console.log("category", category)
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setValues({ ...values, [e.target.name]: e.target.value })

    };

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        updateProduct(user.token, values._id, values)
            .then((res) => {
                setLoading(false)
                toast.success('แก้ไข "' + res.data.title + '" เสร็จสิ้น')
                console.log(res)
                navigate('/admin/index')
            }).catch((err) => {
                setLoading(false)
                toast.error('แก้ไขไม่สำเร็จ')
                console.log(err)
            })

    };
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>
                <div className="col p-5 mt-4 mb-4 bg-light rounded-3">
                    {loading
                        ? <h1>กำลังโหลด... <Spin/></h1>
                        : <h1>แก้ไขข้อมูลสินค้า</h1>}

                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>ชื่อสินค้า</label>
                            <input type="text" name="title" className="form-control"
                                value={values.title}
                                onChange={handleChange}></input>
                        </div>
                        <FileUpload loading={loading} setLoading={setLoading} values={values} setValues={setValues} />
                        <div className='form-group'>
                            <label>หมวดหมู่สินค้า</label>
                            <select
                                name="category"
                                className="form-control"
                                onChange={handleChange}
                                value={values.category._id}>{
                                    category.length > 0 &&
                                    category.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}>
                                            {item.name}
                                        </option>))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>รายละเอียด</label>
                            <textarea type="text" name="description" className="form-control"
                                value={values.description}
                                onChange={handleChange}></textarea>
                        </div>
                        <div className='form-group'>
                            <label>ขนาด</label>
                            <input type="text" name="size" className="form-control"
                                value={values.size}
                                onChange={handleChange}></input>
                        </div>
                        <div className='form-group'>
                            <label>ราคา</label>
                            <input type="number" name="price" className="form-control"
                                value={values.price}
                                onChange={handleChange}></input>
                        </div>
                        <div className='form-group'>
                            <label>จำนวนสินค้า ( /กิโลกรัม )</label>
                            <input type="number" name="quantity" className="form-control"
                                value={values.quantity}
                                onChange={handleChange}></input>
                        </div>
                        <button className='btn btn-primary'>แก้ไข</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default UpdateProduct
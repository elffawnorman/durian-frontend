import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../../layouts/MenubarAdmin';
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
//function
import { createProduct } from '../../../functions/product';
import { listCategory } from '../../../functions/category';
import FileUpload from './FileUpload';

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

const CreateProduct = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [values, setValues] = useState(initialstate)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadData(user.token);
    }, [])

    const loadData = (authtoken) => {
        listCategory(authtoken)
            .then(res => {
                //
                //console.log(res.data)
                setValues({ ...values, categories: res.data });
            }).catch(err => {
                //
                console.log(err.response);
            });
    };
    //console.log('values', values)


    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setValues({ ...values, [e.target.name]: e.target.value })

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(user.token, values)
            .then((res) => {
                console.log(res)
                toast.success('เพิ่ม "' + res.data.title + '" สำเร็จ')
                window.location.reload()
            }).catch((err) => {
                console.log(err.response.data)
                toast.error('เพิ่มสินค้าไม่สำเร็จ')
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
                        ? <h1>กำลังโหลด...<Spin /></h1>//true
                        : <h1>เพิ่มสินค้า</h1>//false
                    }
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>ชื่อสินค้า</label>
                            <input type="text" name="title" className="form-control mb-2"
                                value={values.title}
                                onChange={handleChange}></input>
                        </div>
                        <FileUpload  loading={loading} setLoading={setLoading} values={values} setValues={setValues} />

                        <div className='form-group'>
                            <label>หมวดหมู่</label>
                            <select
                                name="category"
                                className="form-control"
                                onChange={handleChange}
                                required>
                                <option>...เลือก</option>
                                {
                                    values.categories.length > 0 &&
                                    values.categories.map((item) => (
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
                        <button className='btn btn-success mt-3'>เพิ่ม</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CreateProduct;
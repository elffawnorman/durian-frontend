import { values } from 'lodash'
import React, { useState } from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'
import { toast } from 'react-toastify'

import { useSelector } from 'react-redux'
import FileUpload from '../product/FileUpload'
import ReactQuill from 'react-quill'; //ES6

//function 
import { createArticle } from '../../../functions/article'

const initialstate = {
    title: "",
    images: [],
    subcontent: "",
    content: "",
}
const CreateArticle = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [values, setValues] = useState(initialstate);
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createArticle(user.token, values)
            .then(res => {
                console.log(res)
                toast.success('เพิ่มบทความ ' + res.data.title + 'สำเร็จ')
            }).catch(err => {
                console.log(err)
                toast.error('เพิ่มบทความไม่สำเร็จ')

            })
    }

    return (
        <div className='container-fluid '>
            <div className='row'>
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>
                <div className="col-8 p-5 mt-4 mb-4 bg-light rounded-3">
                    <div className='row'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/admin/article">บทความ</a></li>
                                <li className="breadcrumb-item active" aria-current="page">สร้างบทความ</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='row'>
                        <h1>สร้างบทความ</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>หัวข้อบทความ</label>
                                <input type="text" name="title" className="form-control mb-2"
                                    value={values.title}
                                    onChange={handleChange}></input>
                            </div>
                            <FileUpload loading={loading} setLoading={setLoading} values={values} setValues={setValues} />


                            <div className='form-group'>
                                <label>เนื้อหาย่อ</label>
                                <input type="text" name="subcontent" className="form-control"
                                    value={values.subcontent}
                                    onChange={handleChange}></input>
                            </div>
                            <br />
                            <br />
                            <div className='form-group'>
                                <label>เนื้อหา</label>
                                <textarea
                                    className="form-control"
                                    type='text'
                                    name="content"
                                    onChange={handleChange}
                                    value={values.content}
                                    rows="3" />
                                {/* <ReactQuill  name={"content"} onChange={handleChange}  value={values.content} /> */}
                            </div>
                            <hr />
                            <button className='btn btn-success'>เพิ่มบทความ</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateArticle

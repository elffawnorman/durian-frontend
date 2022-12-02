import React, { useState, useEffect } from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'
import { useSelector } from 'react-redux'

import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FileUpload from '../product/FileUpload'
//function
import { readArticle, editArticle } from '../../../functions/article'
import { Spin } from 'antd'


const initialstate = {
    title: "",
    images: [],
    subcontent: "",
    content: "",
}



const EditArticle = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState(initialstate)

    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        loadData()
    }, [])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editArticle(user.token, values._id, values)
            .then((res)=>{
                setLoading(false)
                toast.success('แก้ไขบทความสำเร็จ')
                console.log(res)
                navigate('/admin/article')
            }).catch((err)=>{
                setLoading(false)
                toast.error('แก้ไขบทความไม่สำเร็จ')
                console.log(err)
            })

    }
    const loadData = () => {
        readArticle(params.id)
            .then((res) => {
                setValues({ ...values, ...res.data })
            }).catch((err) => {
                console.log(err)
            })

    }




    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>
                <div className="col-8 p-5 mt-4 mb-4 bg-light rounded-3">
                    <div className='row'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/admin/article">บทความ</a></li>
                                <li className="breadcrumb-item active" aria-current="page">แก้ไขบทความ</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='row'>
                        {loading
                        ? <h1>loading <Spin/></h1>
                        : <h1>แก้ไขบทความ</h1>
                        }

                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>หัวข้อบทความ</label>
                                <input type="text" name="title" className="form-control"
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
                            <button className='btn btn-success'>แก้ไขบทความ</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditArticle
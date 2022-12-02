import React, { useState, useEffect } from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
//function
import { listArticle,removeArticle } from '../../../functions/article';

//card
import AdminArticleCard from '../../../card/AdminArticleCard';
export const ManageArticle = () => {
    const {user} =useSelector((state)=>({...state}))
    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData(100)
    }, [])

    const loadData = (count) => {
        setLoading(true)
        listArticle(count)
            .then(res => {

                setLoading(false)
                setArticle(res.data)

            }).catch(err => {
                setLoading(false)

                console.log(err)
            })
    }

    const handleRemove=(id)=>{
        // console.log(id)
        if(window.confirm("ต้องการจะลบใช่ไหม"))
        removeArticle(user.token,id)
        .then(res=>{
            toast.success('ลบสำเร็จ')
            loadData(100)
            console.log(res)
        }).catch(err=>{
            toast.error('ลบไม่สำเร็จ')

            console.log(err)
        })
    }

    return (
        <div className='container-fluid '>
            <div className='row'>
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>
                <div className="col-md align-self-center">
                    <div className='container p-5 mt-4 mb-4 bg-light rounded-3'>
                        <div className='row pt-5 pb-3'>
                            <div className='col'>
                                {
                                    loading
                                        ? <h1>Loading<Spin /></h1>//true
                                        : <h1>บทความ</h1>//false
                                }
                            </div>
                            <div className="col ">
                                <Link to='/admin/article/create' style={{ textDecoration: 'none' }}><button className='btn btn-success text-center float-end'>สร้างบทความ</button></Link>
                            </div>
                        </div>
                        <div className='row '>
                            {
                                article.map((item) => (
                                    <div className='row' key={item._id}>
                                        <AdminArticleCard 
                                        handleRemove={handleRemove}
                                        article={item}  />
                                    </div>))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default ManageArticle

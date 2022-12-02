import React from 'react'
import moment from 'moment/min/moment-with-locales';
import { Link } from 'react-router-dom';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const AdminArticleCard = ({ article, handleRemove }) => {
    const { title, subcontent, images, updatedAt, _id } = article


    return (
        <>
            <div className='row '>
                <div className="card mb-3" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={images && images.length
                                ? images[0].url
                                : ""
                            } className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h4 className="card-title">{title}</h4>
                                <p className="card-text h5">{subcontent}</p>
                                <p className="card-text h5"><small className="text-muted">แก้ไขเมื่อ {moment(updatedAt).locale('th').startOf(updatedAt).fromNow()}</small></p>
                            </div>
                        </div>
                        <div className='col-auto ms-auto pt-2'>
                            <div className='row p-2 text-warning'>
                                <a href={'/admin/article/edit/'+_id} style={{ textDecoration: 'none',color:'#557153' }}>
                                    <EditOutlined className='' style={{ fontSize: '36px',  textDecoration: 'none' }} key="edit" />
                                </a>
                            </div>
                            <div className='row p-2 text-secondary'>
                                <DeleteOutlined
                                    onClick={() => handleRemove(_id)}
                                    style={{ fontSize: '36px' }} key="setting" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default AdminArticleCard
import React from 'react'
import { Card, Tabs } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import moment from 'moment/min/moment-with-locales';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux'

import { toast } from 'react-toastify'

const SingleArticleCard = ({ article }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()
    const { title,  images,content, createdAt, updatedAt, _id } = article
    return (
        <div className='container'>
            <div className='col-md'>
                <div className='row'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/article">บทความ</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{title}</li>
                        </ol>
                    </nav>
                </div>
                <div className='row'>
                    <Carousel  autoPlay showArrows={false} infiniteLoop showThumbs={false}>
                        {images && images.map(item => <img style={{height:'fit-content'}} key={item.public_id} src={item.url} />)}
                    </Carousel>
                </div>
                <div className='row'>
                    <div className='col'>
                        <figure>
                            <blockquote class="blockquote">
                                <h4>{title}</h4>
                            </blockquote>
                            <figcaption class="blockquote-footer">
                                เขียนเมื่อ <cite title="created">{moment(createdAt).locale('th').format('ll')}</cite>
                            </figcaption>
                        </figure>
                    <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleArticleCard
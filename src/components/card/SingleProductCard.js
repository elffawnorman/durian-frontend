import React from 'react'
import { Card, Tabs } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux'

//lodash
import _ from 'lodash'

///function
import { addWishList } from '../functions/users';

import { toast } from 'react-toastify'
const { Meta } = Card;


const SingleProductCard = ({ product, item }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()
    const { _id, category, title, description, images, price, quantity, sold, size } = product;




    const handleAddToCart = () => {

        let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...product,
            count: 1
        })
        let unique = _.uniqWith(cart, _.isEqual)
        localStorage.setItem("cart", JSON.stringify(unique))
        dispatch({
            type: "ADD_TO_CART",
            payload: unique
        })
        dispatch({
            type: 'SET_VISIBLE',
            payload: true
        })
    }

    const handleAddWish = (e) => {
        if (user) {
            addWishList(user.token, _id)
                .then(res => {
                    console.log(res.data)
                    toast.success("เพิ่มรายการโปรดสำเร็จ")
                }).catch(err => {
                    console.log(err)
                })
        } else {
            toast.error('go login')
        }
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-7 card p-2'>
                    <Carousel autoPlay showArrows={true} infiniteLoop>
                        {images && images.map(item => <img key={item.public_id} src={item.url} />)}
                    </Carousel>
                </div>
               

                <div className='col-md-5'>
                    <div className='row'>
                        <h1 className='bg-success p-3 text-white'>{title}</h1>
                        <Card
                            actions={[
                                <a onClick={handleAddWish}>
                                    <HeartOutlined
                                        className='text-danger h4'
                                    /><br />
                                    เพิ่มรายการโปรด
                                </a>,
                                <>
                                    <a onClick={handleAddToCart}>
                                        <ShoppingCartOutlined
                                            className='text-success h4'

                                        />
                                        <br />ใส่ตะกร้า
                                    </a>
                                </>,

                            ]}
                        >
                            <ul className="list-group list-group-flush">
                                {category &&
                                    <li className="list-group-item">
                                        หมวดหมู่
                                        <span className='float-end'>{category.name}</span>
                                    </li>
                                }
                                <li className="list-group-item">
                                    ราคา
                                    <span className='float-end'>{price}  บาท</span>
                                </li>
                                <li className="list-group-item">
                                    จำนวนสินค้าที่มี
                                    <span className='float-end '>{quantity}  กิโลกรัม</span>
                                </li>
                                <li className="list-group-item">
                                    ขายได้
                                    <span className='float-end'>{sold}  กิโลกรัม</span>
                                </li>
                            </ul>

                        </Card>
                    </div>
                    <hr />
                    <div className='row'>
                        <Card >
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="รายละเอียดสินค้า" key="1">
                                    {description}
                                </Tabs.TabPane>
                            </Tabs>
                        </Card>

                    </div>

                </div>
            </div>
            
        </>
    )
}

export default SingleProductCard
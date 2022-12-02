import React from 'react'
import { Card } from 'antd';
import { ShoppingCartOutlined, EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

//lodash
import _ from 'lodash'

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()


    const { _id, title, images, price,size } = product

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
    return (

        <Card
            hoverable
            style={{
                width: 300,
                marginTop: 16,
            }}
            cover={<img className='p-1' style={{ height: "150px", objectFit: 'cover' }} alt="" src={images && images.length
                ? images[0].url
                : ""
            } />}
            content={<p>{price}</p>}
            actions={[
                <a href={'/product/' + _id}>
                    <EyeFilled
                        className='text-secondary'
                        style={{ fontSize: '32px' }}
                        key="edit" />
                </a>,
                <ShoppingCartOutlined
                    style={{ fontSize: '32px',}}
                    key="delete"
                    onClick={handleAddToCart}
                />,
            ]}
        >
            <Meta className='h6 text-black' title={title +' '+ size} description={"ราคา " + price + '.00 บาท (/กิโลกรัม)'} />

        </Card>
        
    )
}

export default ProductCard
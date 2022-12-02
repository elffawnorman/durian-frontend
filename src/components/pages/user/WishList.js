import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


//function'
import { getWishList, removeWishList, } from '../../functions/users'

import MenubarUser from '../../layouts/MenubarUser'

const WishList = () => {
    const [wishlist, setWishList] = useState([])
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getWishList(user.token)
            .then((res) => {
                setWishList(res.data.wishlist)
            })
    }

    const handleRemove = (productId) => {
        removeWishList(user.token, productId)
            .then((res) => {
                console.log(res.data)
                loadData()
            })
    }


    return (
        <div className='container pt-5'>
            <div className='row'>
                <div className="col-md-2">
                    <MenubarUser />
                </div>
                <div className="col p-5 mt-4 mb-4 bg-light rounded-3">
                    <div className='row' >
                        <h1>สินค้าที่สนใจ</h1>
                        {wishlist.map((item, index) =>
                            <div className='row' >
                                <div key={index} style={{ width: "70%" }} className='alert alert-secondary'>
                                    <img className='p-1' style={{ height: "150px", objectFit: 'cover' }} alt="" src={item.images && item.images.length
                                        ? item.images[0].url
                                        : ""
                                    } />
                                    <Link to={"/product/" + item._id} className='h5'>
                                        {item.title}
                                    </Link>
                                    <span onClick={() => handleRemove(item._id)} className='' style={{ float: 'right' }}>ลบ</span>
                                    <br />
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default WishList
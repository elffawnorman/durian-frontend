import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Drawer } from 'antd';

const DrawerSide = () => {
    const dispatch = useDispatch();
    const { cart, drawer } = useSelector((state) => ({ ...state }))

    const onClose = () => {
        dispatch({
            type: 'SET_VISIBLE',
            payload: false
        })
    }


    return (
        <>
        <Drawer  title={"สินค้าในตะกร้ามี " + cart.length} placement="right" onClose={onClose} visible={drawer} >
            {cart.map((item) =>

                <div className="card mb-2" key={item}>
                    <img src={item.images[0].url} style={{ width: "100%", height: '50px', objectFit: 'cover' }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h6 className="card-title">{item.title} x {item.count}</h6>
                    </div>
                </div>
            )}
            <Link to='/cart'>
                <button onClick={onClose} className='btn btn-success'>ไปยังตะกร้า</button>
            </Link>
        </Drawer>
        </>
    )
}

export default DrawerSide
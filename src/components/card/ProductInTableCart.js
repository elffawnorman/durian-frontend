import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import React from 'react';
import{DeleteFilled } from '@ant-design/icons'


const ProductInTableCart = ({ item }) => {
    const dispatch = useDispatch()

    const handleChangeCount = (e) => {
        const count = e.target.value <1 ? 1 :e.target.value;
        if(count > item.quantity){
            toast.error('เกินจำนวนสินค้าที่มีในคลัง')
            return;
        }
        let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
      
        cart.map((product, i) => {
            if (product._id == item._id) {
                cart[i].count = count
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "ADD_TO_CART",
            payload: cart
        })
    }


    const handleRemoveInCart=()=>{
        let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if (product._id == item._id) {
                cart.splice(i,1)
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "ADD_TO_CART",
            payload: cart
        })
    }

    return (
        <tbody>
            <tr>
                <td><img src={item.images[0].url} width="100" /></td>
                <td className='h5'>{item.title}</td>
                <td className='h5'>{item.size}</td>
                <td className='h5'>{item.price}</td>
                <td><input className='form-control h5'
                    
                    style={{width:'80px'}}
                    value={item.count}
                    type="number"
                    onChange={handleChangeCount} />
                </td>
                <td ><DeleteFilled className='text-danger' style={{fontSize:'26px'}} onClick={handleRemoveInCart}/></td>
            </tr>
        </tbody>
    )
}

export default ProductInTableCart
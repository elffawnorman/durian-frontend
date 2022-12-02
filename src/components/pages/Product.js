import React, { useState, useEffect } from 'react'
//function
import { readProduct } from '../functions/product'

//tool
import { useParams } from 'react-router-dom'
import SingleProductCard from '../card/SingleProductCard'
import BestSeller3 from '../home/BestSeller3'

const Product = () => {
  const param = useParams()
  const [product, setProduct] = useState([])

  useEffect(() => {
    loadData()
  }, [])



  const loadData = () => {
    readProduct(param.id)
      .then(res => {
        setProduct(res.data)
      }).catch(err => {
        console.log(err.response.data)
      })
  }


  return (
    <div className='container p-5 mt-4 mb-4 bg-light rounded-3'>
      <div className='row pt-4'>
        <SingleProductCard product={product} />
      </div>
      <div className='row pt-4'>
        <hr />
        <hr />
        <h3 className='text-center bg-success p-3 text-white'>สินค้าที่เกี่ยวข้อง</h3>

        <BestSeller3 />

      </div>
    </div>
  )
}

export default Product
import React, { useState, useEffect } from 'react'
//cardProduct layout
import ProductCard from '../card/ProductCard'
import LoadingCard from '../card/LoadingCard'
//function
import { listProductBy } from '../functions/product'

const BestSeller3 = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true);
        listProductBy("sold", "desc", 3)
            .then(res => {
                setLoading(false)
                setProducts(res.data)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <>
            <div className='container'>
                {loading
                    ? (<LoadingCard count={3} />)
                    : (
                        <div className='col-md align-self-center'>
                            <div className='row'>
                                {products.map((item, index) => (
                                    <div key={index} className='col-md'>
                                        <ProductCard product={item} />
                                    </div>))}
                            </div>
                        </div>
                    )}

            </div>
        </>
    )
}

export default BestSeller3
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../card/ProductCard'
//antd
import { Slider, Spin, Checkbox } from 'antd';
//function
import { listProduct, searchFilters } from '../functions/product'
import { listCategory } from '../functions/category'



const Shop = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);

    const [category, setCategory] = useState([])
    const [categorySelected, setCategorySelected] = useState([]);

    const { search } = useSelector((state) => ({ ...state }))
    // console.log(search.text)
    const { text } = search


    //useEffect โหลดข้อมูลทั้งหมด
    useEffect(() => {
        loadData()
        listCategory().then(res => setCategory(res.data))
    }, []);
    console.log(category)

    const loadData = () => {
        listProduct(12)
            .then((res) => {
                setProduct(res.data)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    //useEffect โหลดข้อมูลสำหรับค้นหา(Search box)
    useEffect(() => {
        const delayTime = setTimeout(() => {
            fetchDataFilter({ query: text })
            if (!text) {
                loadData()
            }
        }, 300)
        return () => clearTimeout(delayTime)

    }, [text])
    //filter
    const fetchDataFilter = (arg) => {
        searchFilters(arg)
            .then(res => {
                setProduct(res.data);
            })
    }

    //useEffect 
    useEffect(() => {
        fetchDataFilter({ price })
    }, [ok])

    const handlePrice = (value) => {
        setPrice(value)

        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    const handleCheck = (e) => {
        let checked = e.target.value

        let inState = [...categorySelected]

        let findCheck = inState.indexOf(checked)

        if (findCheck === -1) {
            inState.push(checked)
        } else {
            inState.splice(findCheck, 1);
        }
        setCategorySelected(inState)
        fetchDataFilter({ category: inState })
        if (inState.length < 1) {
            loadData()
        }

    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row justify-content-around'>
                    <div className='col-md-2 p-5 mt-4 mb-4 bg-light rounded-3'>
                        ตัวกรองและค้นหา
                        <hr />
                        <h5>ค้นหาจากราคาสินค้า</h5>
                        <Slider
                            className='text-warning'
                            value={price}
                            onChange={handlePrice}
                            range max={3000} />

                        <hr />
                        <h5>ค้นหาจากหมวดหมู่ของสินค้า</h5>
                        {category.map((item, index) =>
                            <div className='row'>
                                <Checkbox
                                    onChange={handleCheck}
                                    key={item.id}
                                    value={item._id}
                                >{item.name}</Checkbox>
                            </div>
                        )}

                    </div>

                    <div className='col-md-9 p-5 mt-4 mb-4 bg-light rounded-3'>
                        {loading
                            ? <h4 className='text-warning'>Loading... <Spin /></h4>
                            : <h4 className='text'>สินค้า</h4>
                        }

                        {product.length < 1 && <p>ไม่พบสินค้า</p>}

                        <div className='row pb-5'>
                            {product.map((item, index) =>
                                <div key={index} className="col-md-3 mt-3">
                                    <ProductCard product={item} />
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop
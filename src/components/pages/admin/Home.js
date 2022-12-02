import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';
import { useSelector } from 'react-redux'

//function 
import { listProduct, removeProduct } from '../../functions/product';
import AdminProductCard from '../../card/AdminProductCard';

//notify
import { toast, toastify } from 'react-toastify';


const Home = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //
    loadData(100)
  }, [])

  const loadData = (count) => {
    setLoading(true)
    listProduct(count)
      .then(res => {
        setLoading(false)
        setProduct(res.data)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
  };

  const handleRemove = (id) => {
    // console.log(id)
    if (window.confirm("แน่ใจว่าจะลบ?")) {
      removeProduct(user.token, id)
        .then(res => {
          toast.success("ลบ" + res.data.title + "สำเร็จ!!")
          loadData(100)
          console.log(res)
        }).catch(err => {
          toast.error("ลบไม่สำเร็จ")
          console.log(err)
        })
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col p-5 mt-4 mb-4 bg-light rounded-3">
          {
            loading
              ? <h1>Loading</h1>
              : <h1>แก้ไขสินค้า</h1>
          }
          <div className='row'>
            {product.map((item) => (
              <div key={item._id} className='col-md-3 mb-3'>
                <AdminProductCard product={item} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
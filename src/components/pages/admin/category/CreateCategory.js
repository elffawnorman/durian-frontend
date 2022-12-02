import React, { useState, useEffect } from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
//function
import { createCategory, listCategory, deleteCategory, } from '../../../functions/category';

//redux
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


import { Link } from 'react-router-dom';
const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("HI user " + user.token)
  const [values, setValues] = useState({
    name: "",

  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token)
  }, []
  )

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data)
      }).catch((err) => {
        console.log(err)
      });
  };

  const handleRemove = (id) => {
    deleteCategory(user.token, id)
      .then((res) => {
        console.log(res)
        loadData(user.token)
        toast.success('ลบ "' + res.data.name + '" สำเร็จ!!')

      }).catch((err) => {
        console.log(err);
      });
  };

  console.log('data', category)


  const handleChangeCategory = (e) => {
    //ทำการเซ็ตค่าของ values ให้เป็นค่าที่ได้จาก input
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    createCategory(user.token, values)
      .then((res) => {
        console.log(res)
        loadData(user.token)
        toast.success('เพิ่ม "' + res.data.name + '" สำเร็จ!!')
      })
      .catch((err) => {
        console.log(err)
        toast.error('เพิ่มไม่สำเร็จ')
      })

  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col-md-8 p-5 mt-4 mb-4 bg-light rounded-3">
          <h1>สร้างหมวดหมู่สินค้า</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>เพิ่มหมวดหมู่ทุเรียน</label>
              <input onChange={handleChangeCategory} name="name" value={values.name} type="text" className='form-control' />
              <button className='btn btn-primary mt-2'>เพิ่ม</button>
            </div>
          </form>
          <hr />

          {category.map((item) => (
            <div className='card mb-2' style={{ width: '60%' }} >
              <div className='card-body'>
                <div className='row '>
                  <div className='col'>
                    <div className='h4'>{item.name}</div>
                  </div>
                  <div className='col' style={{ fontSize: '26px' }}>
                    <Link to={''}><div style={{ float: "right" }} className="text-secondary ms-3 link" onClick={() => handleRemove(item._id)}><DeleteOutlined /></div></Link>
                    <Link to={'/admin/update-category/' + item._id}><div className='text-secondary' style={{ float: "right" }} ><EditOutlined /></div></Link>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div >
    </div >
  )
}

export default CreateCategory
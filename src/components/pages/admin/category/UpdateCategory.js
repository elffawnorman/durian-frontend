import React, { useEffect, useState } from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'

//redux
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

//function
import { EditCategory, ReadCategory } from '../../../functions/category'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateCategory = () => {
    const{user}=useSelector((state)=>({...state}))

    const navigate = useNavigate();
    const param = useParams();

    //console.log(param.id)
    const [name, setName] = useState("")
    useEffect(() => {
        loadData(user.token,param.id)


    }, [])

    const loadData = (authtoken,id) => {
        ReadCategory(authtoken, id)
            .then((res) => {
                setName(res.data.name);
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        EditCategory(user.token,param.id,{name})
        .then(res=>{
            navigate("/admin/create-category")
            toast.success('อัปเดต "'+res.data.name+'"')
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className='container-fluid p-5 mt-4 mb-4 bg-light rounded-3'>
            <div className='row'>
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>
                <div className="col">
                    <h1>Update Category</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>แก้ไขหมวดหมู่</label>
                            <input
                                className='form-control'
                                value={name}
                                autoFocus
                                required
                                onChange={(e)=>setName(e.target.value)}></input>
                                <button className='btn btn-primary mt-2'>อัปเดต</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default UpdateCategory
import React from 'react';
import Resize from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, loading, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }))

    const handleChangeFile = (e) => {
        const files = e.target.files;
        if (files) {
            setLoading(true)

            let allfileUpload = values.images//ข้อมูลเป็น Array []
            for (let i = 0; i < files.length; i++) {
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios.post(
                            process.env.REACT_APP_API + '/images',
                            {
                                image: uri,
                            }, {
                                headers: {
                                    authtoken: user.token,
                                }
                            }
                        ).then(res => {
                            setLoading(false)
                            allfileUpload.push(res.data)
                            console.log("allfileUpload in then", allfileUpload)
                            setValues({ ...values, images: allfileUpload });
                        }).catch(err => {
                            console.log(err.response)
                        })
                    },
                    "base64"
                );
            }
        }
    }

    const handleRemove = (public_id) => {
        setLoading(true)
        console.log(public_id)
        //const img = values.images
        const { images } = values
        axios.post(process.env.REACT_APP_API+'/removeimages',
        {public_id},
        {
            headers:{
                authtoken:user.token,
            }
    
        }).then(res=>{
            setLoading(false)
            let filterImages=images.filter(item=>{
                return item.public_id !== public_id
            })
            setValues({...values,images:filterImages})
            console.log(filterImages)
        }).catch(err=>{
            setLoading(false)
            console.log(err)
        })
        
    }

    return (
        <>
            {values.images && values.images.map((c) =>
                <Badge onClick={() => handleRemove(c.public_id)} key={c} style={{ cursor: "pointer" }} count="X">
                    <Avatar className='m-3' src={c.url} shape="square" size={150} />
                </Badge>

            )}

            <div className='form-group'>
                <label >
                    <input onChange={handleChangeFile} type="file" name="file" multiple accept='images/*' className="form-control"></input>
                </label>
            </div>
            <br />
        </>
    )
}

export default FileUpload
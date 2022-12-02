import React from 'react'
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
    console.log(product)
    const { _id, title, description, images,price } = product
    return (

        <Card
            hoverable
            style={{
                width: 300,
                marginTop: 16,
            }}
            cover={<img className='p-1' style={{ height: "150px", objectFit: 'cover' }} alt="example" src={images && images.length
                ? images[0].url
                : ""
            } />}
            actions={[
                <Link to={'/admin/update-product/'+_id}>
                    <EditOutlined
                        style={{fontSize:'32px',color:'#7D8F69'}}
                        key="edit" />
                </Link>,
                <DeleteOutlined
                    
                    className='text-secondary'
                    style={{fontSize:'32px'}}
                    key="delete"
                    onClick={() => handleRemove(_id)} />,
            ]}
        >
            <Meta title={title} description={"ราคา " + price + '.00 บาท (/กิโลกรัม)'} />

        </Card>
    )
}

export default AdminProductCard
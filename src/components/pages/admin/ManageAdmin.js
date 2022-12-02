import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';
import { useSelector } from 'react-redux'
import { Switch, Select, Tag, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import moment from 'moment/min/moment-with-locales';

import { listUser, changeStatus, changeRole, removeUser, resetPassword } from '../../functions/users';

const ManageAdmin = () => {
    const { user } = useSelector((state) => ({ ...state }));

    //ข้อมูลต้นฉบับของตาราง user
    const [data, setData] = useState([]);
    //ข้อมูลที่เลือก
    const [selectData, setSelectData] = useState([]);
    //ข้อมูล loop ใน filter dropdown
    const [drop, setDrop] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [values, setValues] = useState({
        id: "",
        password: "",
    });

    const showModal = (id) => {
        setIsModalVisible(true);
        setValues({ ...values, id: id });
    };
    const handleChangePassword = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleOk = () => {
        setIsModalVisible(false);
        resetPassword(user.token, values.id, { values })
            .then(res => {
                console.log(res)
                loadData(user.token);
            }).catch(err => {
                console.log(err.response)
            })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        //code
        loadData(user.token);
    }, []);

    const loadData = (authtoken) => {
        //code
        listUser(authtoken)
            .then((res) => {
                setData(res.data);
                setSelectData(res.data);

                const dataDrop = [...new Set(res.data.map(item => item.role))]
                setDrop(dataDrop)
            }).catch((err) => {
                console.log(err.response.data)
            });
    }
    const handleOnchange = (e, id) => {
        const value = {
            id: id,
            enabled: e
        }
        changeStatus(user.token, value)
            .then((res) => {
                console.log(res);
                loadData(user.token);
            }).catch((err) => {
                console.log(err.response);
            });
    };
    const handleOnchangeRole = (e, id) => {
        let values = {
            id: id,
            role: e
        }
        changeRole(user.token, values)
            .then((res) => {
                console.log(res)
                loadData(user.token)
            }).catch((err) => {
                console.log(err.response)
            });
    };
    const handleRemove = (id) => {
        if (window.confirm("ต้องการลบผู้ใช้งานใช่หรือไม่")) {
            removeUser(user.token, id)
                .then(res => {
                    console.log(res)
                    loadData(user.token)
                }).catch(err => {
                    console.log(err.response)
                });
        }
    };
    const roleData = ['admin', 'user'];

    const handleSelectRole = (e) => {
        const value = e.target.value
        if (value == 'all') {
            setSelectData(data)
        } else {
            const filterDataRole = data.filter((item, index) => {
                return item.role == value
            })
            setSelectData(filterDataRole)
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>
                <div className="col p-5 mt-4 mb-4 bg-light rounded-3">
                    <h1>จัดการผู้ใช้</h1>
                    <select onChange={(e) => handleSelectRole(e)} >
                        <option value='all'>all</option>
                        {drop.map((item, index) =>
                            <option key={index} value={item}>{item}</option>
                        )}
                    </select>


                    <table className="table">
                        <thead >
                            <tr>
                                <th scope="col">ชื่อผู้ใช้</th>
                                <th scope="col">บทบาท</th>
                                <th scope="col">สถานะ(เปิด/ปิด)</th>
                                <th scope="col">สร้างบัญชีเมื่อ</th>
                                <th scope="col">เข้าสู่ระบบล่าสุด</th>
                                <th scope="col">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectData.map((item) => (
                                <tr>
                                    <th scope="row" key={item.username}>{item.username}</th>
                                    <td>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={item.role}
                                            onChange={(e) => handleOnchangeRole(e, item._id)}
                                        >
                                            {roleData.map((item, index) => (
                                                <Select.Option value={item} key={index}>
                                                    {item == 'admin'
                                                        ? (<Tag color='green'>{item}</Tag>)
                                                        : (<Tag color='red'>{item}</Tag>)
                                                    }
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </td>
                                    <td><Switch checked={item.enabled} onChange={(e) => handleOnchange(e, item._id)} /></td>
                                    <td>
                                        {moment(item.createdAt).locale('th').format('ll')}
                                    </td>
                                    <td>
                                        {moment(item.updatedAt).locale('th').startOf(item.updatedAt).fromNow()}
                                    </td>
                                    <td>
                                        <EditOutlined  style={{fontSize:'26px', color:'#557153'}} onClick={() => showModal(item._id)} />
                                        <DeleteOutlined className='text-secondary ms-3' style={{fontSize:'26px'}} onClick={() => handleRemove(item._id)} />
                                    </td>
                                </tr>

                            ))};

                        </tbody>
                    </table>
                    <Modal title="เปลี่ยนรหัสผ่านผู้ใช้"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        <p>รหัสผ่านใหม่ :</p>
                        <input
                            onChange={handleChangePassword}
                            type="text"
                            name='password' />
                    </Modal>
                </div>

            </div>
        </div>
    );
};

export default ManageAdmin;
import React from 'react'
import { FacebookOutlined } from '@ant-design/icons'
const Footer = () => {
    return (
        <div className='container-fluid p-3 text-white' style={{ fontFamily: "Prompt", fontWeight: 'bold', backgroundColor: "#557153" }} >
            <footer className="row row-cols-1 row-cols-sm-2  py-5 my-5 border-top text-white">
                <div className='container '>
                    <div className='row'>

                        <div className='col mb-3'>
                            <h5 className='text-white'>แถบนำทาง</h5>
                            <ul className="nav flex-column text-white">
                                <li className="nav-item mb-2 ">
                                    <a className="nav-link  text-white" aria-current="page" href="/">หน้าหลัก</a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a className="nav-link text-white" href="/shop">สินค้า</a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a className="nav-link text-white" href="/article">บทความ</a>
                                </li>
                                <li className="nav-item mb-2 dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        เกี่ยวกับ
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/about-us">เกี่ยวกับร้าน</a></li>
                                        <li><a className="dropdown-item" href="/about-us2">เกี่ยวกับผู้จัดทำ</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="col mb-3"><h5 className='text-white'>ติดต่อ</h5>
                            <p className='text-white'>080-000-0000</p>
                            <p className='text-white'>091-000-0000</p>
                        </div>
                        <div className="col mb-3">
                            <h5 className='text-white'>ที่อยู่หน้าร้าน</h5>
                            <p className='text-white'>ตลาดไท ลานฤดูกาล ท้ายซอย 19 หมู่ 9 ถนนพหลโยธิน ตำบล คลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี</p>

                        </div>
                        <div className="col mb-3"></div>
                        <div className="col mb-3">
                            <a className="text-white" href="https://www.facebook.com/groups/304601156906118">< FacebookOutlined style={{ fontSize: '38px' }} /></a>

                        </div>
                    </div>
                </div>
            </footer>
            <div className='row'>
                <div className='p text-center'><em>Copyright ©2022 All rights reserved</em></div>
            </div>
        </div>
    )
}

export default Footer
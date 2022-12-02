import React from 'react'
import BestSeller from '../home/BestSeller'
import RecomendProduct from '../home/RecomendProduct'
import LastestArticle from '../home/LastestArticle'
const Home = () => {
  return (
    <div>
      <div className='container'>
        <h4 className='text-center text-white p-3 mt-5 mb-5 display-4 jumbotron rounded-pill' style={{ backgroundColor: '#7D8F69' }}>สินค้าแนะนำ</h4>
        <div className='row'>
          <div className='col-md '>
            <RecomendProduct />
          </div>
        </div>
        <h4 className='text-center text-white p-3 mt-5 mb-5 display-4 jumbotron  rounded-pill' style={{ backgroundColor: '#7D8F69' }}>สินค้าขายดี</h4>
        <BestSeller />
        <h4 className='text-center text-white p-3 mt-5 mb-5 display-4 jumbotron rounded-pill' style={{ backgroundColor: '#7D8F69' }}>บทความล่าสุด</h4>
        <LastestArticle />
      </div>
    </div>

  )
}

export default Home
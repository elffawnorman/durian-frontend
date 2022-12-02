import React from 'react'
import moment from 'moment/min/moment-with-locales';
import { Link } from 'react-router-dom';


const ArticleCard = ({article}) => {
    const { title, subcontent, images,createdAt, updatedAt, _id } = article
    return (
        <a href={'/article/'+_id} className='text-black' style={{textDecoration:'none'}}>
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={images && images.length
                                ? images[0].url
                                : ""
                            } className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{subcontent}</p>
                                <p className="card-text"><small className="text-muted">เขียนเมื่อ {moment(createdAt).locale('th').format('ll')}</small></p>
                            </div>
                        </div>
                    </div>

                </div>
            
        </a>
    )
}

export default ArticleCard
import React from 'react'
import moment from 'moment/min/moment-with-locales';
import { Link } from 'react-router-dom';


const ArticleCardSmall = ({ article }) => {
    const { title, subcontent, images, createdAt, updatedAt, _id } = article
    return (
        <>
            <a href={'/article/' + _id}  style={{textDecoration:'none'}}>
                <div className="card mb-3" >
                    <div className="row g-0">
                            <img src={images && images.length
                                ? images[0].url
                                : ""
                            } className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text small text-dark">{subcontent}</p>
                                <p className="card-text"><small className="text-muted">เขียนเมื่อ {moment(createdAt).locale('th').format('ll')}</small></p>
                            </div>
                    </div>

                </div>

            </a>

           
        </>
    )
}

export default ArticleCardSmall
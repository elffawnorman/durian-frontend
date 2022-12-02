import React, { useState, useEffect } from 'react'


import { useParams } from 'react-router-dom'
import SingleArticleCard from '../card/SingleArticleCard'

//function
import { readArticle } from '../functions/article'

const ArticleRead = () => {
    const param = useParams()
    const [article, setArticle] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        readArticle(param.id)
            .then((res) => {
                setArticle(res.data)

            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className='container p-5 mt-4 mb-4 bg-light rounded-3'>
            <div className='row pt-4'>
                <div className='col'>
                    <SingleArticleCard article={article} />
                </div>
            </div>
            <div className='row pt-4'>

            </div>
        </div>)
}

export default ArticleRead
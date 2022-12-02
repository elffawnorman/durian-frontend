import React, { useState, useEffect } from 'react'
import ArticleCardSmall from '../card/ArticleCardSmall'
import LoadingCard from '../card/LoadingCard'

//function
import { listArticleBy } from '../functions/article'


const LastestArticle = () => {

  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // setLoading(true);
    listArticleBy("createdAt", 3)
      .then(res => {
        setArticles(res.data)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
  }
  return (
    <>
      <div className='container'>
        {loading
          ? (<LoadingCard count={3} />)
          : (
            <div className='col-md align-self-center'>
              <div className='row'>
                {articles.map((item, index) => (
                  <div key={index} className='col-md'>
                    <ArticleCardSmall article={item} />
                  </div>))}
              </div>
            </div>
          )}
      </div>
    </>
  )

}

export default LastestArticle
import React,{ useState, useEffect } from 'react'
import ArticleCard from '../card/ArticleCard'
import { Slider, Spin, Checkbox } from 'antd';
import { listArticle } from '../functions/article';


const Article = () => {
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState([]);

    useEffect(()=>{
        loadData()
    },[])
    
    const loadData = () =>{
        listArticle(10)
            .then((res)=>{
                setArticle(res.data)
                setLoading(false)
            })
    }


    return (
        <>
            <div className='container p-5 mt-4 mb-4 bg-light rounded-3'>
                <div className='row'>
                    <div className='col-md'>
                        {loading
                            ? <h4 className='text-warning'>กำลังโหลด... <Spin /></h4>
                            : <h4 className='text'>บทความ</h4>
                        }
                        <div className='row pb-5'>
                            {article.map((item, index) =>
                                <div key={index} className="row">
                                    <ArticleCard article={item} />
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Article
        
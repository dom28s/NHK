import React, { useEffect, useState } from 'react'
import './news.css'
import { useNavigate } from 'react-router-dom'

export default function News() {

    const limit = 20
    const [newsContent, setNewsContent] = useState([])
    const [newsCount, setNewsCount] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/getNews?newsCount=${newsCount}&limit=${limit}`, {
                method: "GET",
            });
            const data = await response.json()
            console.log(data)
            setNewsContent((prev) => [...prev, ...data])
            console.log('d')
        }
        
        fetchData()
    }, [newsCount])

    return (
        <div className="main-news">
            <div className="news-list">
                {newsContent.map((e, i) => {
                    return (
                        <div onClick={()=>navigate('/newsDetail',{ state: e })} className="news-list-card">
                            <img className="news-image" src={e.newsPic} alt="not found" />
                            <p dangerouslySetInnerHTML={{__html: e.newsTitle}}></p>

                        </div>
                    )
                })}

            </div>
            <button onClick={() => setNewsCount(prev => prev + 1)}>more</button>
        </div>
    )
}



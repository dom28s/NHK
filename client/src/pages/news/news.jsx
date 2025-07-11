import { useEffect } from 'react'
import './news.css'
import { useState } from 'react'

export default function News(){

    const [content , setContent ] = useState([])
    const [title , setTitle] = useState([])
    const [pic, setPic] = useState([])
    const [newsCount , setNewsCount] = useState(25)

    useEffect(()=>{
      const fetchNewsContent = async() =>{
        const respone = await fetch('http://localhost:3000/getNewsTitle',{method:'GET'})
        const data = await respone.json()
        console.log(data)

        const title = data.map((e)=>e.newsTitle) 
        setTitle(title)
      }



    fetchNewsContent()
    },[])

    

    return(
        <div className="main-news">
            <ul>
                {title.slice(0,newsCount).map((t,i)=> {
                    return <li key={i} dangerouslySetInnerHTML={{ __html: t }}></li>
                })}
            </ul>
            <button onClick={()=>{
                const newNewsCount = newsCount+25
                setNewsCount(newNewsCount)
                console.log(newsCount)
            }}>more</button>
        </div>
    )
}
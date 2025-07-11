import { useEffect, useState } from "react";
import './home.css'

export function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newsImage , setNewsImage] = useState('')


  useEffect(() => {
    const fetchNewsTitles = async () => {
      try {
        const response = await fetch("http://localhost:3000/getNewsTitle", {
          method: "GET",
        });
        const data = await response.json()
        console.log('+++++++++++++++++')
        const newsImage = data[0].pic
        const newsTitle = data[0].title
        
        console.log(data[0].newsPic)

        // for(let e in data[0]){
        //   console.log('d')
        //   console.log(e.newsPic)
        // }

        console.log('title')

        setTitle(newsTitle)
        setNewsImage(newsImage)
      } catch (err) {
        console.log("error in useEffect:", err)
      }
    };

    const fetchNewsContent = async () => {
      try {
        const response = await fetch("http://localhost:3000/getNewsFromUrl", {
          method: "GET",
        });
        const data = await response.json()
        console.log(data);

        setContent(data.bodyhtml)
      } catch (err) {
        console.log("error in useEffect:", err)
      }
    };


    fetchNewsTitles()
    fetchNewsContent()
  }, []);

  return (
    <div>
      <div className="card">
        <div className="title">
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
        </div>
        <div className="image">
          <img src={newsImage} />
        </div>
        <div className="news-content">
          <h5 dangerouslySetInnerHTML={{ __html: content }}></h5>

        </div>
        <div className="random-list">

        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    const fetchNewsTitles = async () => {
      try {
        const response = await fetch("http://localhost:3000/getNewsTitle", {
          method: "GET",
        });
        const data = await response.json()
        console.log(data);

        setTitle(data[0].news_title_ruby)
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
        console.log(';;;;;;;;;;')
        console.log(data);

        setContent(data.bodyhtml)
      } catch (err) {
        console.log("error in useEffect:", err)
      }
    };
    

    fetchNewsTitles()
    console.log('dd')
    fetchNewsContent()
  }, []);

  return (
    <div>
      <h1>home</h1>
      <h2 style={{color:'red'}} dangerouslySetInnerHTML={{ __html: title }}></h2>
      <h5 dangerouslySetInnerHTML={{ __html: content }}></h5>
    </div>
  );
}

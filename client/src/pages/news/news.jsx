import "./news.css";
import { useState } from "react";
import { useEffect, useRef  } from "react";

export default function News() {
  const limit = 20;
  const [allNews, setAllNews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNewsContent = async () => {
      const respone = await fetch(
        `http://localhost:3000/getNewsTitle?page=${page}&limit=${limit}`
      );
      const data = await respone.json();
      setAllNews((prev) => [...prev, ...data]);
      console.log("d");
    };

    fetchNewsContent();
  }, [page]);

  return (
    <div className="main-news">
      <ul className="news-list">
        {allNews.map((e, i) => {
          return (
            <div key={i} className="news-detail-card">
              <img src={e.newsPic} alt="" width={100} />
              <p key={i} dangerouslySetInnerHTML={{ __html: e.newsTitle }}></p>
            </div>
          );
        })}
      </ul>
      <button onClick={() => setPage((prev) => prev + 1)}>more</button>
    </div>
  );
}

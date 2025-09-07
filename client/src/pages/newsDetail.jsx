import { useLocation } from 'react-router-dom'

export default function NewsDetail() {
  const locate = useLocation()
  const news = locate.state

  console.log(news)
  return(
    <div className="main-NewsDetail">
      <img src= {news.newsPic} alt="" />
      <p dangerouslySetInnerHTML={{__html : news.newsContent}}></p>
    </div>
  )
}

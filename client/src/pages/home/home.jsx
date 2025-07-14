import { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Katakana from './../katakana/katakana';
import Hiragana from './../hiragana/hiragana';
export function Home() {

  const navigate = useNavigate()
  return (
    <div className="main-home">
  

      <div className="banner-card">
        <div onClick={()=>navigate('/chat')} className="chat-button"></div>
      </div>
        <div className="content-box">
          <div className="left-content"></div>
          <div className="right-content">
            <div onClick={()=>navigate('/news')} className="news-card "></div>
            <div onClick={()=>navigate('/hira')} className="hira-card card-box">
                <div className="hira-image kanna-image"></div>
                <div className="hira-detail kanna-detail">Hiragana</div>
            </div>
            <div onClick={()=>navigate('/kata')} className="kata-card card-box">
                <div  className="kata-image kanna-image"></div>
                <div className="kata-detail kanna-detail">Katakana</div>

            </div>
          </div>
        </div>
    </div>
  );
}

      // <div className="content-card">
      //   <div onClick={()=>navigate('/news')} className="news-card">
      //     <h1>NEWS</h1>
      //   </div>
      //   <div className="kanna-card">
      //     <div onClick={()=>navigate('/hira')} className="kata-hira-card">
      //       <h3>hira</h3>
      //     </div>
      //     <div onClick={()=>navigate('/kata')} className="kata-hira-card">
      //       <h3>ka</h3>
      //     </div>
      //   </div>
      // </div>
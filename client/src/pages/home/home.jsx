import { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

export function Home() {

  const navigate = useNavigate()
  return (
    <div className="main-home">
      <div className="content-card">
        <div onClick={()=>navigate('/news')} className="news-card">
          <h1>NEWS</h1>
        </div>
        <div className="kanna-card">
          <div onClick={()=>navigate('/hira')} className="hira-card">
            <h3>hira</h3>
          </div>
          <div onClick={()=>navigate('/kata')} className="kata-card">
            <h3>ka</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

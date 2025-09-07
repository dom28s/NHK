import { useState } from "react";



export default function Katakana() {

 const [popup , setPopup] = useState(null)

  const katakana = [
    "ア", "イ", "ウ", "エ", "オ",
    "カ", "キ", "ク", "ケ", "コ",
    "サ", "シ", "ス", "セ", "ソ",
    "タ", "チ", "ツ", "テ", "ト",
    "ナ", "ニ", "ヌ", "ネ", "ノ",
    "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ",
    "ヤ", "", "ユ", "", "ヨ",
    "ラ", "リ", "ル", "レ", "ロ",
    "ワ", "", "", "", "ヲ",
    "ン", "", "", "", "",
  ];

  const katakanaMap = {
    "ア": "a", "イ": "i", "ウ": "u", "エ": "e", "オ": "o",
    "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko",
    "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so",
    "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to",
    "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no",
    "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho",
    "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo",
    "ヤ": "ya", "ユ": "yu", "ヨ": "yo",
    "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro",
    "ワ": "wa", "ヲ": "wo",
    "ン": "n"
  };


  return (
    <div className="main-kata">
      <h1>Katakana Chart</h1>
      <div className="kata-chart">
        {katakana.map((e,i)=>{
          return (
            <p onClick={()=>setPopup([katakanaMap[e],e])} key={i}>{e}</p>
          )
        })}
        
      </div>
      {popup&&(
        <div className="popup">
          {console.log(popup)}
          {console.log(katakanaMap[popup])}
          {alert(popup)}
        </div>
      )}
    </div>
  );
}

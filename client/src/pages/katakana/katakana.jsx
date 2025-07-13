import "./katakana.css";



const vowel = [ "","a", "i", "u", "e", "o"];
export const consonants = [
    vowel,
  ["", "ア", "イ", "ウ", "エ", "オ"],      
  ["k", "カ", "キ", "ク", "ケ", "コ"],
  ["s", "サ", "シ", "ス", "セ", "ソ"],
  ["t", "タ", "チ", "ツ", "テ", "ト"],
  ["n", "ナ", "ニ", "ヌ", "ネ", "ノ"],
  ["h", "ハ", "ヒ", "フ", "ヘ", "ホ"],
  ["m", "マ", "ミ", "ム", "メ", "モ"],
  ["y", "ヤ", "", "ユ", "", "ヨ"],
  ["r", "ラ", "リ", "ル", "レ", "ロ"],
  ["w", "ワ", "", "", "", "ヲ"],
  ["n", "ン", "", "", "", ""],
];
export default function Katakana() {
  return (
    <div className="main-kata">
      <h1>Katakana Chart</h1>
      <div className="kata-chart">
        {consonants.map((e,i)=>e.map((kata,index)=>{
            return <div key={index} className="kata-cell">
                    <p>{kata}</p>
            </div>
        }))}
      </div>
    </div>
  );
}

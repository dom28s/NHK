import pool from "./database.js";
import bcrypt from "bcrypt";

// https://www3.nhk.or.jp/news/easy/news-list.json?_=1750935545574

const controler = {
  hello: (req, res) => {
    console.log("in hello");
    res.send("res send hello");
  },

  singupCheck: async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10; // กำหนดความยากในการ hash
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("--------");

    try {
      const [userCheck] = await pool.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (userCheck.length > 0) {
        return res.send({ success: false, message: "username already used" });
      } else {
        const [emailCheck] = await pool.execute(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );
        if (emailCheck.length > 0) {
          return res.send({ success: false, message: "email already used" });
        } else {
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const today = new Date().toISOString().split("T")[0];
          await pool.execute(
            `INSERT INTO users (username, password, email, add_date)
       VALUES (?, ?, ?, ?)`,
            [username, hashedPassword, email, today]
          );
          return res.send({ success: true, message: "signup complete" });
        }
      }
    } catch (err) {
      console.error(`error in checkDb  : ${err}`);
    }
  },

  loginCheck: async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    try {
      const [user] = await pool.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (user.length == 0) {
        return res.send({ isUser: false, isPassword: false });
      } else {
        const isPasswordValid = await bcrypt.compare(
          password,
          user[0].password
        );
        if (isPasswordValid) {
          return res.send({ isUser: true, isPassword: true });
        } else {
          return res.send({ isUser: true, isPassword: false });
        }
      }
    } catch (err) {
      console.error(`error in login : ${err}`);
    }
  },

  getNewstitle :async (req,res)=>{
    try{
      const [rows] = await pool.execute('SELECT news_title_ruby FROM news ')
      console.log(rows[0])
      res.send(rows)
    }catch(err){
      console.error('error in getNewstitle :',err)
    }
  },  

  getNewsFromUrl : async(req,res)=>{
    const respon = await fetch('https://www3.nhk.or.jp/news/easy/ne2025070711398/ne2025070711398.html')
    let news = await respon.text()
    // console.log(news)
    news = news.split('<div class="article-body" id="js-article-body">')
    news = news[1].split('</div>')
    news = news[0].replace(/[\n\t]/g, '').replace(/\s\s+/g, ' ')
    console.log(news)
    res.send({bodyhtml : news})
  },

  updateNews: async (req, res) => {
    try {
      const respon = await fetch(
        "https://www3.nhk.or.jp/news/easy/news-list.json?_=1750935545574",
        { method: "GET" }
      );
      const html = await respon.json();
      const data = html[0];
      const news = [];
      for (let data in html[0]) {
        for (let l = 0; l <= 4; l++) {
          if (html[0][data]?.[l]) {
            const [rows] = await pool.execute(
              "SELECT news_id FROM news WHERE news_id = ?",
              [html[0][data][l].news_id]
            );
            if (rows.length === 0) {
              console.log("update ");
              console.log(html[0][data][l].news_id)
              await pool.execute(
                "INSERT INTO news (news_id, news_rank, news_title, news_title_ruby, news_url, has_image, news_image_url, pub_date )VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  html[0][data][l].news_id,
                  html[0][data][l].top_priority_number,
                  html[0][data][l].title,
                  html[0][data][l].title_with_ruby,
                  `https://www3.nhk.or.jp/news/easy/${html[0][data][l].news_id}/${html[0][data][l].news_id}.html`,
                  html[0][data][l].has_news_web_image,
                  html[0][data][l].has_news_web_image
                    ? html[0][data][l].news_web_image_uri
                    : null,
                  data,
                ]
              );
              console.log("update complete");
            }
          }
        }
      }
    } catch (err) {
      console.error(`error in updateNews : ${err}`);
    }
  },

  //   getLink: async (req, res) => {
  //     const respon = await fetch(
  //       "https://www3.nhk.or.jp/news/easy/news-list.json?_=1750935545574",
  //       { method: "GET" }
  //     );
  //     const html = await respon.json();
  //     const data = html[0];
  //     let title =[]
  //     for (let data in html[0]) {
  //       for (let l = 0; l <= 4; l++) {
  //         if (html[0][data]?.[l]?.title) {
  //           let title_ruby = html[0][data][l].title_with_ruby;
  //           title_ruby = title_ruby.split('<ruby>').filter(Boolean)
  //           console.log(title_ruby);
  //           console.log('========')
  //           for (let x of title_ruby){

  //             if (x.includes('<rt>')&&x.includes('</rt></ruby>')){
  //                   const[kanji,unclean] = x.split('<rt>')
  //                   const[furigana,clen] = unclean.split('</rt></ruby>')

  //                   title.push({
  //                     ruby : kanji,
  //                     rt : furigana
  //                   })
  //                   console.log(title)
  //             }else{
  //                 title.push({rt : x})
  //                 console.log('++++++++++++++')
  //             }
  //             }

  //             console.log('----------')
  //             //   let news = "https://www3.nhk.or.jp/news/easy/"+html[0][data][l].news_id+"/"+html[0][data][l].news_id+'.html'

  //             //   console.log(news)
  //         }
  //       }
  //     }
  //   },
};
export default controler;

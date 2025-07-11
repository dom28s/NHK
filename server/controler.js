import pool from "./database.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

// https://www3.nhk.or.jp/news/easy/news-list.json?_=1750935545574

const controler = {
  hello: (req, res) => {
    console.log("in hello");
    res.send("res send hello");
  },

  singupCheck: async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10; // กำหนดความยากในการ hash
    // console.log("Username:", username);
    // console.log("Email:", email);
    // console.log("Password:", password);
    // console.log("--------");

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
      console.error(`error in checkDb  : ${err.massage}`);
    }
  },

  loginCheck: async (req, res) => {
    const { username, password } = req.body;
    // console.log(username);
    // console.log(password);
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
          const token = jwt.sign(
            { id: user[0].id, username: user[0].username },
            "your-secret-key",
            { expiresIn: "1h" }
          );
          return res.send({ isUser: true, isPassword: true, token });
        } else {
          return res.send({ isUser: true, isPassword: false });
        }
      }
    } catch (err) {
      console.error(`error in login : ${err.massage}`);
    }
  },
  getNewstitle: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const [rows] = await pool.execute(
        "SELECT news_image_url, news_url, news_title_ruby FROM news WHERE has_image = 1 ORDER BY news_id DESC LIMIT ? OFFSET ?;",
        [limit, offset]
      );

      const newsDetails = await Promise.all(
        rows.map((row) => controler.getNewsFromUrl(row.news_url))
      );

      const news = rows.map((row, i) => ({
        newsTitle: row.news_title_ruby,
        newsPic: row.news_image_url,
        newsContent: newsDetails[i], // ถ้าต้องการเก็บข้อมูลบทความด้วย
      }));

      res.send(news);
    } catch (err) {
      console.error("error in getNewstitle :", err);
      res.status(500).send("Internal Server Error");
    }
  },

  getNewsFromUrl: async (url) => {
    try {
      if (typeof url !== "string") {
        console.error("Invalid URL:", url);
        return null;
      }
      const response = await fetch(url);
      const html = await response.text();

      if (!html) {
        console.error("Empty HTML from:", url);
        return null;
      }

      let news = html.split('<div class="article-body" id="js-article-body">');
      if (!news[1]) {
        return null;
      }

      news = news[1].split("</div>");
      if (!news[0]) {
        console.error("Closing div tag not found");
        return null;
      }

      news = news[0].replace(/[\n\t]/g, "").replace(/\s\s+/g, " ");
      return news;
    } catch (err) {
      console.error(`error in getNewsFromUrl ${err.massage}`);
      return null;
    }
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
              // console.log("update ");
              // console.log(html[0][data][l].news_id)
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
      console.error(`error in updateNews : ${err.massage}`);
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

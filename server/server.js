import express from "express"
import cors from "cors"
import router from "./route.js"
const port = 3000

const app = express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(router)

app.listen(port,()=>{
    console.log('work at port' + port)
})

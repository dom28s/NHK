import express from "express"
import controler from "./controler.js"

const router  = express.Router()

router.get('/updateNews',controler.updateNews)
router.post('/signupCheck',controler.singupCheck)
router.post('/loginCheck', controler.loginCheck)
router.get('/getNewsTitle', controler.getNewstitle)
router.get('/getNewsFromUrl', controler.getNewsFromUrl)

export default router
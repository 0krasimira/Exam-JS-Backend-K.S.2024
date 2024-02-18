const router = require("express").Router()
const stoneManager = require("../managers/stoneManager")

router.get("/", async (req, res) => {
    // const courses = await courseManager.getThree().lean()
    res.render("home")
})

router.get('/404', (req, res) => {
    res.render('404')
})




module.exports = router
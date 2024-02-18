const router = require('express').Router()

// const stoneManager = require('../managers/courseManager')
const {getErrorMessage} = require('../utils/errorUtils')
// const {isAuth} = require("../middlewares/authMiddleware")
// const {isGuest} = require('../middlewares/authMiddleware')

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.get('/search', (req, res) => {
    res.render('search')
})

router.get('/create', (req, res) => {
    res.render('stone/create')
})


module.exports = router
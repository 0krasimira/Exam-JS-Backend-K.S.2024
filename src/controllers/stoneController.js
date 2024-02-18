const router = require('express').Router()

const stoneManager = require('../managers/stoneManager')
const {getErrorMessage} = require('../utils/errorUtils')
const {isAuth} = require("../middlewares/authMiddleware")
// const {isGuest} = require('../middlewares/authMiddleware')

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.get('/search', (req, res) => {
    res.render('search')
})

router.get('/create', isAuth, (req, res) => {
    res.render('stone/create')
})

router.post('/create', isAuth, async(req, res) => {
    const newStone = req.body
    try{
        await stoneManager.create(req.user._id, newStone);
        res.redirect('/dashboard')
       }catch(err){
        const message = getErrorMessage(err)
        res.status(400).render("stone/create", {...newStone, error: message})
       }
    })


module.exports = router
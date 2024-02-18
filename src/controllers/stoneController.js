const router = require('express').Router()

const stoneManager = require('../managers/stoneManager')
const { getErrorMessage } = require('../utils/errorUtils')
const { isAuth } = require("../middlewares/authMiddleware")
// const {isGuest} = require('../middlewares/authMiddleware')

router.get('/dashboard', async (req, res) => {
    const stones = await stoneManager.getAll().lean()
    res.render('dashboard', { stones })
})

router.get('/search', (req, res) => {
    res.render('search')
})

router.get('/create', isAuth, (req, res) => {
    res.render('stone/create')
})

router.post('/create', isAuth, async (req, res) => {
    const newStone = req.body
    try {
        await stoneManager.create(req.user._id, newStone);
        res.redirect('/dashboard')
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(400).render("stone/create", { ...newStone, error: message })
    }
})

router.get('/:stoneId/details', async (req, res) => {
    const stoneId = req.params.stoneId
    try {
        const stone = await stoneManager.getOneWithDetails(stoneId).lean()
        const isOwner = stone.owner._id.toString() == req.user?._id.toString()
        res.render('stone/details', { stone, isOwner })
    } catch (error) {
        res.status(400).redirect('/404')
    }
})

router.get("/:stoneId/edit", isAuth, async (req, res) => {

    if (!req.user) {
        return res.redirect('/auth/login')
    }
    try {
        const stone = await stoneManager.getOneWithDetails(req.params.stoneId).lean()
        res.render("stone/edit", { stone })
    } catch (err) {
        res.status(404).redirect("404")
    }
})

router.post("/:stoneId/edit", isAuth, async (req, res) => {
    const stone = req.body
    const stoneId = req.params.stoneId
    
    try{
        const isOwnerInfo = await stoneManager.getOneWithDetails(stoneId)
        const isOwner = isOwnerInfo.owner._id.toString() == req.user?._id
        if(!isOwner){
            return res.redirect(`/dashboard`)
        }
        await stoneManager.edit(stoneId, stone)
            res.redirect(`/${req.params.stoneId}/details`)

    }catch(err){
        const message = getErrorMessage(err)
        res.status(400).render("stone/edit", {stone, error: message})
       }
})


module.exports = router
const router = require('express').Router()

const stoneManager = require('../managers/stoneManager')
const {getErrorMessage} = require('../utils/errorUtils')
const {isAuth} = require("../middlewares/authMiddleware")
// const {isGuest} = require('../middlewares/authMiddleware')

router.get('/dashboard', async (req, res) => {
    const stones = await stoneManager.getAll().lean()
    res.render('dashboard', {stones})
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

    router.get('/:stoneId/details', async (req, res) => {
        const stoneId = req.params.stoneId
        try{
            const stone = await stoneManager.getOneWithDetails(stoneId).lean()
            const isOwner = stone.owner._id.toString() == req.user?._id.toString()//movie.owner(object) ==  req.user._id(string) (convirts them to the same type)
            // const casts = await castManager.getByIds(movie.casts).lean() //--- only if populate is not used(populates the cast info into the movie with the ref: Cast in the Movie Schema)
            res.render('stone/details', {stone, isOwner})
    } catch(error){
        res.status(400).redirect('/404')
    }
     
    })


module.exports = router
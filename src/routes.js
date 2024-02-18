const router = require('express').Router()

const homeController = require('./controllers/homeController')
const stoneController = require('./controllers/stoneController')
const userController = require('./controllers/userController')

router.use(homeController)
router.use(stoneController)
router.use('/auth', userController)

router.get('*', (req,res) => {
    res.redirect('/404')
})

module.exports = router
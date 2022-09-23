const Router = require ('express')
const itemRouter = require ('./itemRouter')
const userRouter = require ('./userRouter')
const router = new Router()




router.use('/item',itemRouter)
router.use('/user', userRouter)


module.exports = router
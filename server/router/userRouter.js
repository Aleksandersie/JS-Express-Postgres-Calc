const Router = require ('express')
const userController = require('../apiController/userController')
const router = new Router()

router.post('/registration',userController.registration )
router.post('/login', userController.login)

module.exports = router
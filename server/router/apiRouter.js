const express = require('express')
const router = express.Router()
const ApiController = require('../apiController/apiController')


router.get('/', ApiController.get) 
router.post('/', ApiController.post)



module.exports = router
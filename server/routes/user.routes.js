const express = require('express')
const router = express.Router()
const {HandleSignUp , HandleLogin , HandleProfile, HandlePasswordChange } = require('../controller/user.controller')
const { jwtAuthenticate } = require('../utils/jwtAuth')


router.post('/signup',HandleSignUp)
router.post('/login',HandleLogin)
router.get('/profile',jwtAuthenticate,HandleProfile)
router.put('/profile/edit-profile',jwtAuthenticate,HandlePasswordChange)


module.exports = router
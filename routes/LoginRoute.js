const express = require('express')
const router = express.Router()
const loginController = require('../controllers/LoginController')

router.get('/create', loginController.getCreatePage)
router.get('/login', loginController.getLoginPage)

// Вхід користувача
router.post('/login/go', loginController.postLoginGo)
// Реєстрація користувача
router.post('/create/add', loginController.postCreateUser)
// Вихід користувача
router.post('/logout', loginController.postLogoutUser)

module.exports = router;
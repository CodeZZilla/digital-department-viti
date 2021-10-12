const express = require('express')
const router = express.Router()
const UserAPI = require('../controllers/api/UserController')

router.get('/', async (req, res) => {
    let users = await UserAPI.getAllUsers()
    res.render('index', {
        userSession: req.session.user,
        users: users
    })
})


module.exports = router;
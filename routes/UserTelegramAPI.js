const express = require('express')
const router = express.Router()
const UserTelegram = require('../controllers/api/UserTelegramController')

router.get('/users', async (req, res) => {
    let users = await UserTelegram.findAll()
    res.json(users)
})

router.get('/user/find/:id', async (req, res) => {
    let user = await UserTelegram.findByIdTelegram(req.params.id)
    res.json(user)
})

router.post('/user/create', async (req, res) => {
    await UserTelegram.create({
        telegramId: req.body.telegramId,
        groups: req.body.groups,
        types: req.body.types,
        departments: req.body.departments,
        numberLessons: req.body.numberLessons,
        userStatus: req.body.userStatus
    })
    res.json(true)
})

router.post('/user/edit', async (req, res) => {
    await UserTelegram.update(req.body.id, req.body.user)
    res.json(true)
})

module.exports = router;
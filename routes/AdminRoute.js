const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController')

router.get('/settings', adminController.getSettingsPage)
router.get('/audience', adminController.getAudiencePage)
router.get('/audience/edit-group', adminController.getEditGroupPage)
router.post('/audience/add', adminController.postAudienceAdd)
router.get('/audience/rm/:id', adminController.getAudienceRm)
router.get('/audience/:id', adminController.getAudienceById)
router.post('/audience/save', adminController.postAudienceSave)
router.post('/user/edit', adminController.postUserEdit)

module.exports = router;
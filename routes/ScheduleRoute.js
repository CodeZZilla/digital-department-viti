const express = require('express');
const scheduleController = require('../controllers/ScheduleController');

const scheduleRouter = express.Router();

scheduleRouter.get('/view/:username', scheduleController.getSchedule);
scheduleRouter.get('/edit', scheduleController.editSchedule);

// РОЗКЛАД
scheduleRouter.post('/allAudiencesByUsername', scheduleController.allAudiencesByUserName)
scheduleRouter.post('/getDataByIdUser', scheduleController.getDataByIdUser)
scheduleRouter.get('/allAudiences', scheduleController.allAudiences);
scheduleRouter.post('/saveAll', scheduleController.saveAll);
scheduleRouter.post('/getData', scheduleController.getData);
scheduleRouter.post('/getTypeById', scheduleController.getTypeById);


module.exports = scheduleRouter;
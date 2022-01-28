const express = require('express')
const router = express.Router()
const UserAPI = require('../controllers/api/UserController')
const LessonAPI = require('../controllers/api/LessonController')
const TypeAPI = require('../controllers/api/TypeController')
const AudienceAPI = require('../controllers/api/AudienceController')

router.get('/', async (req, res) => {
    let users = await UserAPI.getAllUsers()
    res.render('index', {
        userSession: req.session.user,
        users: users
    })
})

//поиск только на сегодня!
router.get('/search', async (req, res) => {
    let lessons = await LessonAPI.findAllNowDate()
    let users = await UserAPI.getAllUsers()
    res.render('search', {
        userSession: req.session.user,
        groups: uniqueGroups(lessons),
        departmentsNumberMap: uniqueDepartmentMap(users),
        types: await TypeAPI.findAll()
    })
})

router.post('/search/params', async (req, res) => {
    let lessons = await LessonAPI.findAllNowDate()
    let groups = req.body.groups,
        typesId = req.body.typesId,
        numLessons = req.body.numberLessons,
        usersId = req.body.usersId

    let outputLessonsGroups = []
    if(groups.length === 0){
        outputLessons = lessons
    }else {
        for (let i = 0, lenLessons = lessons.length; i < lenLessons; i++){
            for (let j = 0, lenGroup = groups.length; j < lenGroup; j++){
                if(lessons[i].group === groups[j]){
                    outputLessonsGroups.push(lessons[i])
                    break
                }
            }
        }
    }

    let outputLessonsNumLessons = []
    if(numLessons.length !== 0){
        for (let i = 0, lenLessons = outputLessonsGroups.length; i < lenLessons; i++){
            for (let j = 0, lenNumLessons = numLessons.length; j < lenNumLessons; j++){
                if(outputLessonsGroups[i].numberLesson.toString() === numLessons[j]){
                    outputLessonsNumLessons.push(outputLessonsGroups[i])
                    break
                }
            }
        }
    } else {
        outputLessonsNumLessons = outputLessonsGroups
    }

    let outputLessonsTypes = []
    if(typesId.length !== 0){
        for (let i = 0, lenLessons = outputLessonsNumLessons.length; i < lenLessons; i++){
            for (let j = 0, len = typesId.length; j < len; j++){
                if(outputLessonsNumLessons[i].idType === undefined)
                    continue
                if(outputLessonsNumLessons[i].idType.toString() === typesId[j].toString()){
                    outputLessonsTypes.push(outputLessonsNumLessons[i])
                    break
                }
            }
        }
    }else {
        outputLessonsTypes = outputLessonsNumLessons
    }

    let outputLessonsUsers = []
    if(usersId.length !== 0){
        for (let i = 0, lenLessons = outputLessonsTypes.length; i < lenLessons; i++){
            for (let j = 0, len = usersId.length; j < len; j++){
                if(outputLessonsTypes[i].idUser.toString() === usersId[j].toString()){
                    outputLessonsUsers.push(outputLessonsTypes[i])
                    break
                }
            }
        }
    }else {
        outputLessonsUsers = outputLessonsTypes
    }

    let output = []
    for (let item of outputLessonsUsers){
        let user = await UserAPI.getUser(item.idUser)
        let type = await TypeAPI.findById(item.idType)
        output.push({
            date: item.date,
            numberLesson: item.numberLesson,
            audience: (await AudienceAPI.findById(item.idAudience)).audienceTitle,
            type: type.typeTitle === 'null' ? '' : type.typeTitle,
            departmentNumber: user.title.split(' ')[1],
            title: item.title,
            teacher: item.teacher,
            group: item.group
        })
    }

    res.json(output)
})

router.get('/search/groups', async (req, res) => {
    let lessons = await LessonAPI.findAllNowDate()
    res.json(uniqueGroups(lessons))
})

router.get('/search/departmentsNumberMap', async (req, res) => {
    let users = await UserAPI.getAllUsers()
    let output = uniqueDepartmentMap(users)
    const obj = Object.fromEntries(output.entries())
    res.json(obj)
})

router.get('/search/types', async (req, res) => {
    res.json(await TypeAPI.findAll())
})

function uniqueGroups(lessons) {
    let result = [];

    for (let lesson of lessons) {
        if (!result.includes(lesson.group)) {
            result.push(lesson.group);
        }
    }
    return result;
}

function uniqueDepartmentMap(users) {
    let mapOutput = new Map()

    for (let user of users) {
        let numberDepartment = user.title.split(' ')[1]
        if (numberDepartment === 'NaN')
            continue
        if (!mapOutput.has(numberDepartment)) {
            mapOutput.set(numberDepartment, user._id)
        }
    }
    return mapOutput
}

module.exports = router;

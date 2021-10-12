const Lesson = require('../models/Lesson');
const AudienceAPI = require('./api/AudienceController');
const TypeAPI = require('./api/TypeController');
const UserAPI = require('./api/UserController');

exports.allAudiencesByUserName = async function (req, res) {
    let user = await UserAPI.getUserByUsername(req.body.username)
    let audiencesByUser = await AudienceAPI.findAllByIdUser(user.id)
    res.json(audiencesByUser)
}

exports.getDataByIdUser = async function (req, res) {
    res.json(await Lesson.find({date: req.body.date, idUser: req.body.idUser}))
}

exports.allAudiences = async function (req, res) {
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        let audiences = await AudienceAPI.findAllByIdUser(req.session.user.id)
        res.json(audiences)
    }
}

exports.saveAll = async function (req, res) {
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        await Lesson.find({date: req.body.date, idUser: req.session.user.id}).deleteMany()
        if (req.body.arr !== undefined) {
            let arrayLessons = []
            req.body.arr.forEach(x => {
                let lesson;
                if (x.idType !== '') {
                    lesson = new Lesson(x)
                    lesson.idUser = req.session.user.id
                    arrayLessons.push(lesson)
                } else {
                    if (x.title === '' && x.teacher === '' && x.group === '') {
                    } else {
                        lesson = new Lesson({
                            date: x.date,
                            idAudience: x.idAudience,
                            numberLesson: x.numberLesson,
                            title: x.title,
                            teacher: x.teacher,
                            group: x.group
                        })
                        lesson.idUser = req.session.user.id
                        arrayLessons.push(lesson)
                    }
                }
            })

            for await (let item of arrayLessons)
                await item.save()
        }
        return res.json('ok')
    }
}

exports.getData = async function (req, res) {
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        res.json(await Lesson.find({date: req.body.date, idUser: req.session.user.id}))
    }
}

exports.editSchedule = async function (req, res) {
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        res.render('schedule-edit', {
            audiences: await AudienceAPI.findAllByIdUser(req.session.user.id),
            types: await TypeAPI.findAll(),
            user: req.session.user
        });
    }
};

exports.getSchedule = async function (req, res) {
    let user = await UserAPI.getUserByUsername(req.params.username)
    let audiencesByUser = await AudienceAPI.findAllByIdUser(user.id)
    res.render('schedule-view', {
        audiences: audiencesByUser,
        idUser: user.id.toString(),
        username: user.username,
        title: user.title,
        userSession: req.session.user
    });
}

exports.getTypeById = async function (req, res) {
    res.json(await TypeAPI.findById(req.body.id))
}
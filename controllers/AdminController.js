const Lesson = require('../models/Lesson')
const api = require('../controllers/api/AudienceController')

exports.getAudiencePage = async function(req, res){
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        let audiences = await api.findAllByIdUser(req.session.user.id)

        res.render('audience', {
            user: req.session.user,
            audiences: audiences
        })
    }
}

exports.getEditGroupPage = async function(req, res){
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        let audiences = await api.findAllByIdUser(req.session.user.id)

        res.render('group-in-audience', {
            user: req.session.user,
            audiences: audiences
        })
    }
}

exports.getSettingsPage = async function(req, res){
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        res.render('settings', {
            user: req.session.user
        })
    }
}

exports.postAudienceAdd = async function(req, res){
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        await api.create({
            audienceTitle: req.body.audienceTitle,
            groupInAudience: 'null',
            idUser: req.session.user.id
        })
        let audiences = await api.findAllByIdUser(req.session.user.id)
        res.json(audiences)
    }
}

exports.getAudienceRm = async function(req, res){
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        await Lesson.find({idAudience: req.params.id, idUser: req.session.user.id}).remove()
        await api.deleteById(req.params.id);
        let audiences = await api.findAllByIdUser(req.session.user.id)
        res.json(audiences)
    }
}

exports.getAudienceById = async function(req, res) {
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        let audience = await api.findById(req.params.id)
        res.json(audience)
    }
}

exports.postAudienceSave = async function(req, res) {
    if (req.session.user === undefined) {
        res.render('error', {error: 'Ви не увійшли в аккаунт'})
    } else {
        let audience = await api.findById(req.body.id)
        if(req.body.audienceTitle !== undefined){
            audience.audienceTitle = req.body.audienceTitle
        }
        if(req.body.groupInAudience !== undefined){
            if(req.body.groupInAudience === 'null'){
                audience.groupInAudience = 'null'
            }else {
                audience.groupInAudience = req.body.groupInAudience
            }
        }
        await api.update(req.body.id, audience)

        let audiences = await api.findAllByIdUser(req.session.user.id)
        res.json(audiences)
    }
}

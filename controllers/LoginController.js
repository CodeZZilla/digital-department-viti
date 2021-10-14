const api = require('../controllers/api/UserController')


exports.getCreatePage = async function(req, res){
    res.render('user-create')
}

exports.getLoginPage = async function(req, res){
    if (req.session.user !== undefined){
        res.redirect('/')
    }else{
        res.render('user-login')
    }
}

exports.postLoginGo = async function(req, res){
    if (req.session.user) return res.redirect('/')
    api.checkUser(req.body)
        .then((user) => {
            if (user === 'Error wrong') {
                res.redirect('/user/login')
            }
            if (user) {
                req.session.user = {id: user._id, username: user.username, title: user.title, description: user.description}
                res.redirect('/')
            }
        }).catch(() => {
            res.redirect('/user/login')
        }
    )
}

exports.postCreateUser = async function(req, res){
    try {
        let user = await api.createUser(req.body)
        req.session.user = {id: user._id, username: user.username, title: user.title, description: user.description}
        return res.redirect('/')
    }catch (err){
        res.render('error', {
            error: 'Виникла помилка реєстрації'
        })
    }
}

exports.postLogoutUser = async function(req, res){
    if (req.session.user) {
        delete req.session.user
        res.redirect('/')
    }
}
let crypto = require('crypto')
let User = require('../../models/User.js')

exports.createUser = async function (userData) {
    let user = new User({
        username: userData.username,
        password: hash(userData.password)
    });
    return await user.save();
}

exports.getAllUsers = async function () {
    let users = await User.find({})
    return users;
}

exports.getUserByUsername = async function (username) {
    let user = await User.findOne({username: username})
    return {
        id: user._id,
        username: user.username,
        title: user.title
    }
}

exports.getUser = async function (id) {
    return User.findOne(id)
}

exports.checkUser = async function (userData) {
    return User
        .findOne({username: userData.username})
        .then(function (doc) {
            if (doc === null)
                return Promise.reject("Error wrong")

            if (doc.password === hash(userData.password)) {
                console.log("User password is ok");
                return Promise.resolve(doc)
            } else {
                return Promise.reject("Error wrong")
            }
        })
}

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}
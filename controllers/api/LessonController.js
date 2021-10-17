const Lesson = require('../../models/Lesson')

function exception(err) {
    if (err) return 'error'
    return 'ok'
}

exports.create = async function (object) {
    let lesson = new Lesson(object)
    await lesson.save(exception)
}

exports.deleteById = async function (id) {
    await Lesson.findByIdAndDelete(id, exception)
}

exports.update = async function (id, object) {
    await Lesson.findByIdAndUpdate(id, object, exception)
}

exports.findAll = async function () {
    return Lesson.find({})
}

exports.findAllNowDate = async function () {
    let dateTimeNow = new Date()
    let dateNow = dateTimeNow.toISOString().split('T')[0]
    return Lesson.find({date: dateNow})
}

exports.findById = async function (id) {
    return Lesson.findById(id)
}
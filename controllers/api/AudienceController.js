const Audience = require('../../models/Audience');

function exception(err) {
    if (err) return 'error';
    return 'ok';
}

exports.create = async function (object) {
    let audience = new Audience(object);
    await audience.save(exception);
};

exports.deleteById = async function (id) {
    await Audience.findByIdAndDelete(id, exception);
};

exports.update = async function (id, object) {
    await Audience.findByIdAndUpdate(id, object, exception);
};

exports.findAll = async function () {
    return Audience.find({});
};

exports.findAllByIdUser = async function (id) {
    return Audience.find({idUser: id});
};

exports.findById = async function (id) {
    return Audience.findById(id);
};
const Type = require('../../models/Type');

function exception(err) {
    if (err) return 'error';
    return 'ok';
}

exports.create = async function (object) {
    let type = new Type(object);
    await type.save(exception);
};

exports.deleteById = async function (id) {
    await Type.findByIdAndDelete(id, exception);
};

exports.update = async function (id, object) {
    await Type.findByIdAndUpdate(id, object, exception);
};

exports.findAll = async function () {
    return Type.find({});
};

exports.findById = async function (id) {
    return Type.findById(id);
};
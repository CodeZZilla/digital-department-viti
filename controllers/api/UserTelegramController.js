const UserTelegram = require('../../models/UserTelegram');

function exception(err) {
    if (err) return 'error';
    return 'ok';
}

exports.create = async function (object) {
    let type = new UserTelegram(object);
    await type.save(exception);
};

exports.deleteById = async function (id) {
    await UserTelegram.findByIdAndDelete(id, exception);
};

exports.update = async function (id, object) {
    let user = await UserTelegram.findOne({telegramId: id})
    await UserTelegram.updateOne(user, object, exception)
};

exports.findAll = async function () {
    return UserTelegram.find({});
};

exports.findByIdTelegram = async function (id) {
    return UserTelegram.findOne({telegramId: id});
};
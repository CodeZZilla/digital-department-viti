const {Schema, model} = require('mongoose');

const schema = new Schema({
    telegramId: {type: String, unique: true, required: true},
    groups: {type: Array, required: true, default: []},
    types: {type: Array, required: true, default: []},
    departments: {type: Array, required: true, default: []},
    numberLessons: {type: Array, required: true, default: []},
    userStatus: {type: Boolean, required: true, default: false}
});

module.exports = model('UserTelegram', schema);
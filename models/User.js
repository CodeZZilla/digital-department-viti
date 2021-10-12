const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    title: {type: String, default: 'Кафедра NaN'},
    description: {type: String, required: true, default: 'null'}
});

module.exports = model('User', schema);
const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    date: {type: String, required: true},
    numberLesson: {type: Number, required: true, min: 1, max: 4},
    idAudience: {type: Types.ObjectId, required: true, ref:'Audience'},
    idType: {type: Types.ObjectId, required: false, ref:'Type'},
    idUser: {type: Types.ObjectId, required: true, ref:'User'},
    title: {type: String, default: ''},
    teacher:{type: String, default: ''},
    group: {type: String, default: ''}
});

module.exports = model("Lesson", schema);
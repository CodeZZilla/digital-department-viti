const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    audienceTitle: {type: String, required: true},
    groupInAudience: {type: String, required: true, default: 'null'},
    idUser: {type: Types.ObjectId, required: true, ref:'User'}
});

module.exports = model("Audience", schema);
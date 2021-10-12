const {Schema, model} = require("mongoose");

const schema = new Schema({
    typeTitle: {type: String, required: true}
});

module.exports = model("Type", schema);
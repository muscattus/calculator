const mongoose = require("mongoose");
const shortid = require("shortid");
mongoose.Promise = global.Promise;

const History = mongoose.model(
    "history",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        equation: {type: String},
        calculatedresult: String,
        date: { type: Date, default: Date.now },
    })
);

export {};
module.exports = History;
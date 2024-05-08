const mongoose = require("mongoose");
const itemSchema = require('./Task')

const ListSchema = new mongoose.Schema({
    ListName: String,
    Items: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Item'
    }]
})

module.exports = ListSchema
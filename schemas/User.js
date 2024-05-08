const mongoose = require("mongoose");
const listSchema = require("./List")

const userSchema = new mongoose.Schema(
    {
        Name: String,
        email: String,
        Lists: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List'
        }]
    }
)
module.exports =  userSchema

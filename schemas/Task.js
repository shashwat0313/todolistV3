const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    Name: {type:String, required:true}
})

module.exports = itemSchema
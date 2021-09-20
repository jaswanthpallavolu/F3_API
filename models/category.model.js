const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    parentId: { type: String },


}, { timestamps: true })

const Category = mongoose.model('N_Category', categorySchema)
module.exports = Category


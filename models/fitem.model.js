const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fItemSchema = new Schema({
    title: { type: String, required: true },
    categoryId: { type: String, required: true },
    link: { type: String, required: true }
}, { timestamps: true })

const FItem = mongoose.model('fItems', fItemSchema)
module.exports = FItem
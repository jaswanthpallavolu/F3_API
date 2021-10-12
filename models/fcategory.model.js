const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    parentId: { type: String },
    description: { type: String }
}, { timestamps: true })

const FCategory = mongoose.model('fitnessCategory', categorySchema)
module.exports = FCategory

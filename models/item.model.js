const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    categoryId: { type: String, require: true },
    itemName: { type: String, require: true },
    url: { type: String, require: true },
}, { timestamps: true })

const Item = mongoose.model('N_Item', itemSchema)
module.exports = Item
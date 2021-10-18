const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infoSchema = new Schema({
    description: { type: String },
    blogs: [{
        link: { type: String },
        name: { type: String }
    }]
})

const itemSchema = new Schema({
    categoryId: { type: String, require: true },
    itemName: { type: String, require: true },
    url: { type: String, require: true },
    more: infoSchema
}, { timestamps: true })

const Item = mongoose.model('N_Item', itemSchema)
module.exports = Item
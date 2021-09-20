const router = require('express').Router()
const Item = require('../models/item.model')

router.route('/').get(async (req, res) => {
    const b = await Item.find()
    res.json(b)
})
router.route('/add').post((req, res) => {
    const obj = {
        categoryId: req.body.categoryId,
        itemName: req.body.itemName,
        url: req.body.url
    }

    const newItem = new Item(obj)
    newItem.save()
        .then((data) => { res.json(data) })
        .catch((err) => res.status(400).json("message" + err))
})

router.route('/:id').delete(async (req, res) => {

    Item.findById({ _id: req.params.id }).deleteOne((err, data) => {
        if (err) throw err;
        res.json(data)
    })
})

router.route('/update/:id').post((req, res) => {

    var newValues = {
        itemName: req.body.name,
        url: req.body.url
    }
    Item.findById({ _id: req.params.id }).updateOne(newValues, (err, data) => {
        if (err) throw err;
        res.json(data)
    })



})
module.exports = router
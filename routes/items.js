const router = require('express').Router()
const Item = require('../models/item.model')

router.route('/').get(async (req, res) => {
    const b = await Item.find()
    res.json(b)
})
const getItem = async (i) => {
    const result = { itemId: i._id, itemName: i.itemName, url: i.url, more: {} }
    if (i?.more) {
        const more = { description: i.more?.description, blogs: [] }
        const list = []
        for (let j of i.more.blogs) {
            const obj = { name: j.name, link: j.link }
            list.push(obj)
        }
        more.blogs = list
        result.more = more
    }
    return result
}
router.route('/:id').get(async (req, res) => {
    console.log(req.params.id)
    const item = await Item.findById({ _id: req.params.id })
    if (item) res.json(await getItem(item))
    else res.status(400).json('item not found')
})
router.route('/add').post((req, res) => {
    const obj = {
        categoryId: req.body.categoryId,
        itemName: req.body.itemName,
        url: req.body.url,
        more: req.body.more
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

router.route('/:id').put((req, res) => {
    var newValues = {
        itemName: req.body.name,
        url: req.body.url,
        more: req.body.more
    }
    Item.findById({ _id: req.params.id }).updateOne(newValues, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
})

module.exports = router
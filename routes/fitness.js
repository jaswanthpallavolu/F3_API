const router = require('express').Router()
const FCategory = require('../models/fcategory.model')
const FItem = require('../models/fitem.model')

// Functions
async function getHeirarchy(categories) {
    const result = []
    for (let cat of categories) {
        const sections = await FCategory.find({ parentId: cat._id })
        const list = { name: cat.name, id: cat._id, description: cat.description }
        const sub = []
        for (let i of sections) {
            sub.push({
                name: i.name,
                id: i._id,
            })
        }
        list.sections = sub
        result.push(list)
    }
    return result
}
async function getDetails(category) {
    const result = []
    const items = await FItem.find({ categoryId: category._id })
    const sub = []
    for (let i of items) {
        sub.push({
            title: i.title,
            link: i.link,
            itemId: i._id
        })
    }
    const obj = {
        name: category.name,
        description: category.description,
        id: category._id,
        items: sub
    }
    result.push(obj)
    return result

}
// Get-METHODS
router.route('/categories').get(async (req, res) => {
    const categories = await FCategory.find({ parentId: null })
    const result = await getHeirarchy(categories)
    res.json(result)
})

router.route('/categories/:id').get(async (req, res) => {
    const category = await FCategory.findById({ _id: req.params.id })
    const result = await getDetails(category)
    res.json(result)
})


// POST-METHOS
router.route('/add/category').post((req, res) => {
    const obj = { name: req.body.name }
    const parentId = req.body.parentId
    const description = req.body.description
    if (parentId) obj.parentId = parentId
    if (description) obj.description = description

    const newCategory = new FCategory(obj)
    newCategory.save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err))

})

router.route('/add/item').post((req, res) => {
    const obj = {
        title: req.body.title,
        categoryId: req.body.categoryId,
        link: req.body.link
    }
    const newItem = new FItem(obj)
    newItem.save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err))
})

// Delete
router.route('/category/:id').delete((req, res) => {
    FCategory.findById({ _id: req.params.id }).deleteOne((err, data) => {
        if (err) throw err
        res.json(data)
    })
})
router.route('/item/:id').delete((req, res) => {
    FItem.findById({ _id: req.params.id }).deleteOne((err, data) => {
        if (err) throw err
        res.json(data)
    })
})

//Update
router.route('/item/:id').put((req, res) => {
    const newValues = {
        title: req.body.title,
        link: req.body.link
    }
    FItem.findById({ _id: req.params.id }).updateOne(newValues, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
})


module.exports = router
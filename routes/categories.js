
const router = require('express').Router()
const Category = require('../models/category.model')
const Item = require('../models/item.model')


const values = async () => {
    let result = []
    for (let cat of categories) {
        const items = await Item.find({ categoryId: cat.id })
        let a = []
        items.forEach(i => {
            const b = {
                name: i.itemName,
                url: i.url
            }
            a.push(b)
        })
        const obj = {
            category: cat.category,
            id: cat.id,
            items: a
        }
        result.push(obj)
    }
    return result
}
const getCategories = async (categories) => {
    const result = []
    for (let cate of categories) {
        child = await Category.find({ parentId: cate._id })
        const list = []
        child.forEach(i => {
            list.push({
                id: i._id,
                category: i.name,
                parentId: i.parentId
            })
        })
        result.push({
            id: cate._id,
            category: cate.name,
            sub: list
        })
    }
    return result
}
router.route('/').get(async (req, res) => {
    const categories = await Category.find({ parentId: null })
    const list = await getCategories(categories)
    res.json(list)
})
const getCompleteDetails = async (category) => {
    const result = []
    for (let cate of category) {
        const items = await Item.find({ categoryId: cate._id })
        let a = []
        for (let i of items) {
            const b = {
                id: i._id,
                name: i.itemName,
                url: i.url
            }
            a.push(b)
        }
        const obj = {
            category: cate.name,
            id: cate._id,
            items: a
        }
        result.push(obj)
    }
    return result
}
router.route('/:id').get(async (req, res) => {
    const category = await Category.find({ _id: req.params.id })
    const list = await getCompleteDetails(category)
    res.json(list)
})


router.route('/add').post(async (req, res) => {

    const categoryObj = {
        name: req.body.name
    }
    const parentId = req.body.parentId
    if (parentId) categoryObj.parentId = parentId

    newCategory = new Category(categoryObj)
    newCategory.save()
        .then((obj) => res.json(obj))
        .catch(err => res.status(400).json(err))
})

module.exports = router
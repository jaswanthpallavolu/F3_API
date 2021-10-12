const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
app = express()

app.use(cors())
app.use(express.json())

const uri = process.env.database
mongoose.connect(uri)
const connection = mongoose.connection
connection.once('open', () => {
    console.log('mdb connected successfully')
})

// ROUTES
const categoryRouter = require('./routes/categories')
const ItemRouter = require('./routes/items')
const fitnessRouter = require('./routes/fitness')

app.use('/nutrition/category', categoryRouter)
app.use('/nutrition/item', ItemRouter)
app.use('/fitness', fitnessRouter)

let port = process.env.PORT || 2000
app.listen(port, () => {
    console.log(`server running at port : ${port}`)
})
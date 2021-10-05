const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000
const userRoutes = require('./routes/user')
const cookingRecipeRoutes = require('./routes/cooking')
const path = require('path')
mongoose.connect('mongodb+srv://laura:nodejslaura@clusternode.5hfkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', // lie le cluster à l'app
{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=> console.log("db valid"))
.catch(()=> console.log("db error"))
/*
app.use('/',(req, res,next) =>{
    res.json({message: "oklm"})
})*/
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')//permet de stocket des choses dans le headers
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')// les accès aux méthodes GET, POST, ...
    next()
})

app.use(express.json())
app.use(express.urlencoded({
    extended :true
}))
app.use('/cookingRecipe',cookingRecipeRoutes)
app.use('/user',userRoutes)
module.exports = app
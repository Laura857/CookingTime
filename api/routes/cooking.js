const express = require('express')
const router = express.Router()
const cookingController = require('./../controllers/cooking')

console.log("cooking route")
router.post('/',cookingController.createCookingRecipe)
router.put('/:id',cookingController.updateCookingRecipeId)
router.delete('/:id',cookingController.deleteCookingRecipeId)
router.get('/:id',cookingController.getCookingRecipeId)
router.get('/',cookingController.getAllCookingRecipe)
module.exports = router
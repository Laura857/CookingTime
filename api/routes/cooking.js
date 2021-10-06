const express = require('express')
const router = express.Router()
const cookingController = require('./../controllers/cooking')
const auth = require('../middleware/auth')

router.post('/',cookingController.createCookingRecipe)
router.put('/:id',cookingController.updateCookingRecipeId)
router.delete('/:id',auth,cookingController.deleteCookingRecipeId)
router.get('/:id',cookingController.getCookingRecipeId)
router.get('/',cookingController.getAllCookingRecipe)

module.exports = router
const CookingRecipe = require('../models/CookingRecipe')

exports.createCookingRecipe = (req,res,next)=>{
    console.log("post save cooking recipe")
    const postObject = req.body
    delete postObject._id;
    const p = new CookingRecipe({
        ...postObject
        // urlImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    p.save()
        .then(() => res.status(201).json({message : 'ok'}))
        .catch(error => res.status(400).json({ error}))
}

exports.updateCookingRecipeId =(req,res,next)=>{
    console.log('put update cooking recipe')
    CookingRecipe.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'ok'}))
        .catch(()=> res.status(400).json({ error}))
}

exports.deleteCookingRecipeId =(req,res,next)=>{
    console.log('delete cooking recipe')
    CookingRecipe.findOne({_id:req.param.id})
        .then( cookingRecipe => {
            // const filename = post.urlImage.split('/images/')[1]
            // fs.unlink(`images/${filename}`,()=>{
                CookingRecipe.deleteOne({_id: req.params.id})
                    .then(()=> res.status(200).json({message: 'ok'}))
                    .catch(error => res.status(400).json({error}))
            })
        // })
        .catch(error => res.status(500).json({error}))  
}

exports.getCookingRecipeId = (req,res,next)=>{
    console.log('get cooking recipe id')
    CookingRecipe.findOne({_id:req.params.id})
        .then(cookingRecipe=> res.status(200).json(cookingRecipe))
        .catch(error => res.status(404).json({error}));
}

exports.getAllCookingRecipe = (req,res,next)=> {
    console.log('get all cooking recipe')
    CookingRecipe.find()
        .then(cookingRecipe => res.status(200).json(cookingRecipe))
        .catch(error=> res.status(400).json({error}));
}
const bcrypt = require('bcryptjs')
const { request } = require('../app')
const User = require('./../models/user')
const jsontoken = require('jsonwebtoken')

exports.signup = (req,res,next) =>{
    console.log('Begin signup')
    if (req.body.password.length < 6 ) {
        return res.status(400).json({
            error: {
                errors: {
                    password: {
                        message: "Must have at least 6 characters."
                    }
                }
                }
            })
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log('Create user')
            const user = new User({
                email:req.body.email,
                password: hash,
                pseudo:req.body.pseudo
            })  
            user.save()
                .then(()=> res.status(201).json({message: 'create user'}))
                .catch(error=> res.status(400).json({error}))
        })
        .catch(error=> res.status(500).json({error}))
}

exports.login = (req,res,next) => {
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({error: 'Mail incorrect'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(ok =>{
                    if(!ok){
                        return res.status((401).json({error: 'Mot de passe incorrect'}))
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsontoken.sign(
                            {userId: user._id},'jesuissecret',{ expiresIn:'48h'}
                        ),
                        pseudo: user.pseudo
                    })
                })
                .catch(error=> res.status(500).json({error}))
        })
}

exports.getUserId = (req,res,next)=>{
    console.log('get user with id')
    User.findOne({_id:req.params.id})
        .then(user=> res.status(200).json(user))
        .catch(error => res.status(404).json({error}))
}

exports.updateUserId =(req,res,next)=>{
    console.log('put update user')
    User.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'ok'}))
        .catch(()=> res.status(400).json({ error}))
}
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
                return res.status(401).json({error: 'pas trouvé'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(ok =>{
                    if(!ok){
                        return res.status((401).json({error: 'incorect mdp'}))
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsontoken.sign(
                            {userId: user._id},'jesuissecret',{ expiresIn:'48h'}
                        )
                    })
                })
                .catch(error=> res.status(500).json({error}))
        })
}

exports.formLogin = (req,res,next) => {
    
}
const jsonToken = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        let token = req.headers.authorization.split(' ')[1] //pour spliter le mot clé du token : 0=mot clé 1=token
        const decodedToken = jsonToken.verify(token,'jesuissecret');
        const userId = decodedToken.userId
        console.log(req.body.userId)
        console.log(userId)
        
        if(req.body.userId && req.body.userId !== userId){
            throw 'pas bon ID'
        }
        else{
            next();
        }
    } catch{
        res.status(402).json({
            error: new Error('request pas valid')
        })
    }
}
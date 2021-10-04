const path = require('path');

exports.home = (req,res,next)=> {
    console.log('Home')
    res.sendFile(path.resolve(__dirname, '../view/index.html'));
}
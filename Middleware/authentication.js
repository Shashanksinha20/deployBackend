const jwt = require('jsonwebtoken')
require('dotenv').config();

 const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.key, (err, decoded) => {
            if(err){
                return reject(err)
            }
            return resolve(decoded)
            })
        })
    }

const authenticate = async (req, res, next) => {
    
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){
        console.log("Try")
        return res.status(400).send({ message : "Authorization Token not found or incorrect"})
    }
    
    const token = req.headers.authorization.trim().split(" ")[1]
    console.log(token)
    let decoded;
    try{
        decoded = await verifyToken(token)
    }
    catch(err){
        console.log("Ere",err)
        return res.status(400).send({ message : "Authorization Token not found or incorrect"})
    }
    req.user = decoded.user
    return next()
}

module.exports = authenticate;

  
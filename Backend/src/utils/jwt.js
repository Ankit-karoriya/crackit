import jwt from 'jsonwebtoken';

const generateAccessToken = function(user){
    return jwt.sign(
        {user}, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}

export { generateAccessToken };
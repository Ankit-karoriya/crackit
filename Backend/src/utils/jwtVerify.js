import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    try {
        const token = req.cookies?.AccessToken;
        if(!token){
            return res.status(400).json({message: "No token found"});
        }
    
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid or expired token"});
    }
}

export default verifyJWT;
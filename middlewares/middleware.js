import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    
    
    if (token == null) {return res.sendStatus(401)}

    jwt.verify(token, process.env.JWT_SECRET, (error, user)=>{
        console.log(error);
        if (error) return res.sendStatus(403)
        
        req.user = user 

        next()
    })
}
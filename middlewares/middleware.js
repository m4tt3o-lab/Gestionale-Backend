import jwt from 'jsonwebtoken'

const JWT_SECRET = 'efrtghthyhtg5yh54y56676878ii'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    
    
    if (token == null) {return res.sendStatus(401)}

    jwt.verify(token, JWT_SECRET, (error, user)=>{
        console.log(error);
        if (error) return res.sendStatus(403)
        
        req.user = user 

        next()
    })
}
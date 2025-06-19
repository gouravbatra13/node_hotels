const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{
    
    //check authorization
    const authorization =  req.headers.authorization;
    if(!authorization){
       res.status(401).json({error:'Invalid token'});
    }

    //  Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
      res.status(401).json({error:'UnAuthorize'});
    }

    try {
        //verify jwt token
      const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //Attach user info to request object
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({error:"Invalid token"});
    }
}


/**
 * function to generate jwt token
 */

const generateToken = (userData) => {
    //generate a new jwt token using user data
    // return jwt.sign(userData,process.env.JWT_SECRET);

    /**
     * add token expiry 
     * 3600 seconds
    */
    return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn:3600});

}

module.exports = {
    jwtAuthMiddleware,
    generateToken
};
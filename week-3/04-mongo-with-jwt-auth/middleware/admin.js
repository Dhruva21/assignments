const jwt = require('jsonwebtoken');
const {Admin} = require('../db');
require('dotenv').config(); // access jwt secret key
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const auth = req.headers.authorization;
    try{
        if(auth){
            const break_auth = auth.split(" ");
            if(break_auth[0] === 'Bearer'){
                const token = break_auth[1];
                jwt.verify(token, process.env.JWT_SECRET_KEY);
                next();
            }
            else{
                res.status(500).send('Please provide appropriate token.')
            }
        }else{
            res.status(500).send('Havent received any token.');
        }
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

module.exports = adminMiddleware;
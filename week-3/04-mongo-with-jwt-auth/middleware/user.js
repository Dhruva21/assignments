const jwt = require('jsonwebtoken');
require('dotenv').config(); // can access the variables declared in .env file
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const auth = req.headers.authorization;
    if(auth){
        const break_auth = auth.split(" ")
        if(break_auth[0] === 'Bearer'){
            const token = break_auth[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
                if (err) {
                return res.status(401).send("Authorization Failed");
                }
                req.user = user;
                next();
                });
        }else{
            res.status(500).send('Please send correct token.')
        }
    }else{
        res.status(500).send('Internal server error.')
    }
}

module.exports = userMiddleware;
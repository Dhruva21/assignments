const {User} = require("../db");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const user = req.headers.username;
    const password = req.headers.password;
    const users = await User.findOne({username: user, password: password});
    if(users){
        req.user = users;
        next();
    }else{
        res.status(404).send("User doesn't exist");
    }
}

module.exports = userMiddleware;
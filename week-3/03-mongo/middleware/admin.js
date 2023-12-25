const {Admin} = require('../db');
const mongoose=require("mongoose")

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    // here check whether admin who is trying to post the course exists in admin db or not
    const username = req.headers.username;
    const password = req.headers.password;
    const admin = await Admin.findOne({username: username, password: password});
    if(admin){
        next();
    }else{
        res.status(404).send("Admin doesn't exist");
    }
}

module.exports = adminMiddleware;
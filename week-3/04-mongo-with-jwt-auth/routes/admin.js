const jwt = require('jsonwebtoken');
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
require('dotenv').config(); // by this I can access the variable declared in .env file
const {Admin, User, Course} = require('../db');
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const newAdmin = await Admin.create({username: username, password: password});

    if(newAdmin){
        res.status(200).send('Admin created successfully');
    }else{
        res.status(500).send('Internal server error.');
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    // incase of signin you need to handle sending back the token(sig signed using jwt)
    
    // const username = req.body.username;
    // const password = req.body.password;
    const {username, password} = req.body
    const admin = await Admin.findOne({username: username}) // just find admin by his username
    if(admin){
        if(admin.password === password){
            console.log(process.env.JWT_SECRET_KEY);
            const token = jwt.sign({username}, process.env.JWT_SECRET_KEY);
            res.status(200).send({jwt_token:token})
        }else{
            res.status(500).send('Wrong password.')
        }
    }else{
        res.status(500).send('Admin doesnt exist.')
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {title, description, price, image} = req.body;
    const newCourse = new Course({
        id: Math.floor(Math.random() * 1000),
        title: title,
        description: description,
        price: price,
        image: image
    })
    try{
        await newCourse.save();
        res.status(200).send('New Course added successfully');
    }catch(error){
        res.status(500).send('Internal server error.');
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try{
        const courses = await Course.find();
        res.status(200).json(courses);
    }catch(error){
        res.status(500).send('Internal server error.');
    }
});

module.exports = router;
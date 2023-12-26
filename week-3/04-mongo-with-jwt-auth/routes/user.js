const jwt = require('jsonwebtoken');
require('dotenv').config(); // can access the variables declared in .env file
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Admin, User, Course} = require('../db');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body;
    const newUser = await User.create({username: username, password: password});
    if(newUser){
        res.status(200).send('User created successfully.');
    }else{
        res.status(500).send('Internal server error.');
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    // here we need to sign the username using the jwt secret key
    const {username, password} = req.body;
    const user = await User.findOne({username: username}); // find the user by username if exists in user table
    if(user){
        if(user.password === password){
            const token = jwt.sign({username}, process.env.JWT_SECRET_KEY);
            res.status(200).send({jwt_token:token});
;        }else{
            res.status(500).send('Password invalid.')
        }
    }else{
        res.status(500).send('User doesnt exist.')
    }
});

router.get('/courses', userMiddleware, (req, res) => {
    // Implement listing all courses logic
    Course.find()
            .then((courses) => {
                res.json(courses);
            })
            .catch((error) => {
                res.status(500).send('Internal server error.');
            })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id=req.params.courseId
    const course=await Course.findOne({id:id})
    const username=req.user.username
    const user = await User.findOne({username:username})
    if(course){
        try{
            user.purchased_courses.push(course)
            await user.save()
            res.status(200).send("Course purchased successfully !!");
        }
        catch(err){
            console.log(err)
            res.status(500).send("Internal Server Error");
        }
    }else{
        res.status(401).send(`There are no such courses with Id ${id}`)
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username=req.user.username
    try{
        const user = await User.findOne({username:username})
        res.send(user.purchased_courses)
    }catch{
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router
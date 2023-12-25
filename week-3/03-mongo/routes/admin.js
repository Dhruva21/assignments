const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require('../db');

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    // database create calls is a asynchronous call, hence use async await
    const username = req.body.username;
    const password = req.body.password;
    const newAdmin = await Admin.create({username: username, password: password});

    if(newAdmin){
        res.status(200).send('Admin Created Successfully');
    }else{
        res.status(500).send('Internal server error.')
    }

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    // first adminMiddleware checks the request headers which has admin info is valid or not.
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    // we need to create a course with all info above in Course Schema
    // we will resolve the promise which is returned from db call
    const newCourse = new Course({id: Math.floor(Math.random() * 1000),
                                  title: title,
                                  description: description,
                                  price: price,
                                  image: image
                                    });

    //save this new course
    newCourse.save()
                .then(() => {
                    res.status(200).send('Course created successfully');
                })
                .catch((error) => {
                    res.status(500).send('Internal Server error.');
                })
    
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    // even to get all the courses as adminMiddleware is an aysnc function, resolve the promise here
    Course.find()
            .then((courses) => {
                res.json(courses);// show to the user in json format
            })
            .catch((error) => {
                res.status(500).send('Internal Server error.');
            })
    
});

module.exports = router;
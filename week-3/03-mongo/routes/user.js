const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, User, Course } = require('../db');
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    // signup the user
    const username = req.body.username;
    const password = req.body.password;
    // make db call as async await
    const newUser = new User({username: username, password: password});

    newUser.save()
            .then(() => {
                res.status(200).send('User created successfully');
            })
            .catch((error) => {
                res.status(500).send("Error")
            })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    // similar to get courses in admin routes
    Course.find()
            .then((courses) => {
                res.json(courses);
            })
            .catch((error) => {
                res.status(500).send("Internal Error.")
            })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const course = await Course.findOne({id: courseId});
    const user = req.user; // we saved the user object from the middleware
    if(course){
        try{
            user.purchased_courses.push(course); // put the course into purchased courses array 
            user.save()
                    .then(() => { res.status(200).send("Course purchased successfully.") })
        }catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }else{
        res.status(404).send("Course doesn't exist")
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    // endpoint is /user/purchasedCourses - first step is to do the middle ware which checks whether user exist if yes will proceed further
    const user = req.user; // we found and saved the user object in middleware
    const courses = user.purchased_courses
    if(courses === 0){
        res.send('User has not bought any course.')
    }else{
        res.json(courses);
    }
});

module.exports = router
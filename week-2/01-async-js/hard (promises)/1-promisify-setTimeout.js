/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

// resolve the promise after n seconds --> it uses setTimeOut(function, delay) 
function wait(n) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, n * 1000);
    })
}

// call the function, after the promise is resolved log something
/** 
const beforeTime = new Date().getTime();
wait(10).then(() => {
    const duration = new Date().getTime() - beforeTime;
    console.log(`Promise is resolved after ${duration/1000} seconds.`)
})
*/
module.exports = wait;

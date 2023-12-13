/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep (seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds);
    })
}

// follow the async await, it awaits until the function execution is finished
async function sleepCompletely(time){
    await sleep(time * 1000);
    console.log(`Now the thread is active after ${time*1000} seconds`);
}

// sleepCompletely(5);

module.exports = sleep;

/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

// for the below function js is throwing RangeError: Maximum call stack size exceeded
function recursiveSum(n){
    if( n <= 1){
        return 1;
    }
    return n + recursiveSum(n-1);
}

// iterative sum
function calculateSum(n){
    let ans = 0;
    for(let i = 1; i <= n; i++){
        ans = ans + i;
    }
    return ans;
}

function calculateTime(n) {
    let variableN = [100, 100000, 1000000000];
    for(let val of variableN){
        let startTime = new Date();

        let sum = calculateSum(val);

        let endTime = new Date();
        let diff_milliseconds = endTime - startTime;
        console.log(`For val: ${val}, sum is ${sum} and time taken: ${diff_milliseconds}ms in seconds==> ${diff_milliseconds / 1000}`);
    }
    
    return 0.01;
}

calculateTime(10);
/**
 * Below is the output
 * 
 * (base) dhruvaindavarapu@Dhruvas-MacBook-Air-2 medium % node times.js
For val: 100, sum is 5050 and time taken in seconds==> 0
For val: 100000, sum is 5000050000 and time taken in seconds==> 15000
For val: 1000000000, sum is 500000000067109000 and time taken in seconds==> 1537000
(base) dhruvaindavarapu@Dhruvas-MacBook-Air-2 medium % 
 */
let cnt = 0; // this is global count and update it for every one second
function counter(n){
    console.log(++cnt);
}

setInterval(counter, 1000); // 1000ms ~ 1s --> function counter runs for every one second
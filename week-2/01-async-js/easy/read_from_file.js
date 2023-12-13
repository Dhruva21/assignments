const fs = require('fs');
const { exit } = require('process');

setInterval(counter, 1000);
fs.readFile('3-read-from-file.md', 'utf-8', function(err, data){
    console.log('Data: ' + data);
    console.log('error: ' + err);
})

// expensive operation underneath
// as read file is an asynchronous function, java compiler adds it to the queue
console.log('For loop is started')
for(let i = 0; i < 1000000000; i++){
}
console.log('For loop is done')

// now do setInterval and do set timeout
// I am doing that to check the behaviour of the code when there are multiple asynchornous code

let cnt = 0; // global count
function counter(){
    if( cnt < 10){
        console.log(++cnt);
    }else{
        exit(1);
    }
}

setInterval(counter, 1000);
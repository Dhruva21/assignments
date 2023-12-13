const fs = require('fs');

let data = 'This is the sample data which is to be written to Test.md';
fs.writeFile('Test.md', data, (err, res) => {
    if(err){
        console.log('Error: ' + err);
    }
    console.log('Finished writing to the file');
})

// as write to a file is also a asynchoronous function. I will try to perform expensive taks to check the async nature of the code.

// expensive operation underneath
// as read file is an asynchronous function, java compiler adds it to the queue
console.log('For loop is started')
for(let i = 0; i < 1000000000; i++){
}
console.log('For loop is done')
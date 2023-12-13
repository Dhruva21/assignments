const fs = require('fs');

// write to the file --> a.txt
let data = 'hello     world    my    name   is       raman'
fs.writeFile('a.txt', data, (err, res) => {
    if(err){
        console.log('Error writing to file: ' + err);
    }
    console.log('Finished writing the data to a.txt')
})

// read from the file 

// --> and inside the read function update

fs.readFile('a.txt', 'utf-8', (err, res) => {
    if(err){
        console.log('Error reading from file: ' + err);
    }
    let sentence = res; // here the retunrned sentence is an object if we don't pass an argument as utf-8
    
    sentence = sentence.replace(/\s+/g, ' ').trim();
    
    // now write to a file
    fs.writeFile('a.txt', sentence, (err, res) => {
        if(err){
            console.log('Error in writing to file after modifying sentence: ' + err);
        }
        console.log('Successfully writtnen data to a file');
    })
})
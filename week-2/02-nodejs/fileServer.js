/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const folder_path = './files';

// get api endpoint to return the list of file names in files directory
app.get('/files', (req, res) => {
  fs.readdir(folder_path, (err, files) => {
    if(err){
      res.status(500).send('Error in fetching the files from folder');
    }else{
      res.json(files);
    }
  })
})

// get api by file name /file/:filename --> fetch this :filename by req.params.filename
app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;

  // now read the contents from the filename
  fs.readFile(folder_path + '/' + filename, 'utf-8', (err, data) => {
    if(err){
      res.status(404).send(`File not found`);
    }else{
      res.send(data);
    }
  })
})

// return 404 error code if there is any other route
app.get('*', (req, res) => {
  res.status(404).send('Route not found');
})

// app.listen(port, () => {
//   console.log(`Server is listening on port: ${port}`)
// })
module.exports = app;
/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  const fs = require('fs');
  const port = 3000;
  const app = express();
 
  app.use(bodyParser.json());
  
  // first we need to load the data from the json file which has todos array.
  // let data = fs.readFileSync('todos.json', 'utf-8');
  // let jsonData = JSON.parse(data);
  let todos = [];

  // first api --> get request - /todos
  app.get('/todos', (req, res) => {
    res.send(todos);
  })

  // second api GET /todos/:id - Retrieve a specific todo item by ID
  app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    const todo = todos.find(t => t.id === parseInt(id)); // instead I can run a for loop through the list of todos and find the id if present
    if(!todo){
      res.status(404).send()
    }else{
      res.send(todo);
    }
  })

  // third api POST /todos --> Request Body: { "title": "Buy groceries",  description: "I should buy groceries" }
  app.post('/todos', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const newTodo = {
      id: Math.floor(Math.random() * 1000000), // unique id
      title: title,
      description: description
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);

  })

  // fourth api updated /todos/:id
  app.put('/todos/:id', (req, res) => {

    const title = req.body.title;
    const description = req.body.description;

    // the best way is to find the index of the todo
    // check for the todo if present else send 404 -> not found
    let id = req.params.id;
    const todoIndex = todos.findIndex(t => t.id === parseInt(id)); // instead I can run a for loop through the list of todos and find the id if present
    if(todoIndex == -1){
      res.status(404).send()
    }else{ // if found update the todos 
      todos[todoIndex].title = title;
      todos[todoIndex].description = description;
      res.json(todos[todoIndex]);
    }
  })

  // fifth delete /todos/:id
  app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    const todoIndex = todos.findIndex(t => t.id === parseInt(id));
    if(todoIndex == -1){
      res.status(404).send();
    }else{
      todos.splice(todoIndex, 1) // splice removes the element at current index, second parameter is the count to delete
      res.status(200).send();
    }
  })

  // for all other routes, return 404
  app.use((req, res, next) => {
    res.status(404).send();
  });
  // app.listen(port, () => {
  //   console.log(`Listening on Port: ${port}`);
  // })
  
  module.exports = app;
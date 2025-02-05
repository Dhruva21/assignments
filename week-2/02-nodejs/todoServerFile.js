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

  const fs = require('fs');
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();

  const port = 3000;

  app.use(bodyParser.json());


  // use the below helper funcitons to find the id in the array of objects
  function findIndexById(arr, id){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].id === parseInt(id)){
            return i;
        }
    }
    return -1;
  }

  // before that know that Json.Parse(data) --> used for parsing the data

  const temp_db = 'todos.json'; // use this as file path to reuse in the below api's

  // 1. get all the todos
  app.get('/todos', (req, res) => {
    fs.readFile(temp_db, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }else{
            const todos = JSON.parse(data);
            res.json(todos);
        }
    })
  })

  // 2. get todo by id
  app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(temp_db, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }else{
            const todos = JSON.parse(data);
            const todo = todos.find(t => t.id === parseInt(id));
            if(!todo){
                res.status(404).send('Todo not found!')
              }else{
                res.send(todo);
              }
        }
    })
  })

  // 3. post todos
  app.post('/todos', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const newTodo = {
        id: Math.floor(Math.random() * 1000000), // unique id
        title: title,
        description: description
    };
    fs.readFile(temp_db, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }else{
            const todos = JSON.parse(data);
            todos.push(newTodo);
            fs.writeFile(temp_db, JSON.stringify(todos), (err, data) => {
                if(err){
                    throw err;
                }else{
                    res.status(201).send(newTodo);
                }
            })
        }
    })

  })

  // 4. put(update) todo by id
  app.put('/todos/:id', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    let id = req.params.id;
    fs.readFile(temp_db, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }else{
            const todos = JSON.parse(data);
            const todoIndex = findIndexById(todos, id);
            if(todoIndex == -1){
                res.status(404).send('Todo not found');
            }else{
                todos[todoIndex].title = title;
                todos[todoIndex].description = description;
                
                fs.writeFile(temp_db, JSON.stringify(todos), (err, data) => {
                    if(err){
                        throw err;
                    }else{
                        res.send(todos[todoIndex]);
                    }
                })
            }
        }
    })
  })

  // 5. delete todo by id
  app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(temp_db, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }else{
            const todos = JSON.parse(data);
            const todoIndex = findIndexById(todos, id);
            if(todoIndex == -1){
                res.status(404).send('Todo not found');
            }else{
                todos.splice(todoIndex, 1); // splic is used to remove elements from an array in js
                fs.writeFile(temp_db, JSON.stringify(todos), (err, data) => {
                    if(err){
                        throw err;
                    }else{
                        res.status(200).send('Todo deleted');
                    }
                })
            }
        }
    })
  })

  // all the other requests
  app.use((req, res, next) => {
    res.status(404).send();
  });
  
  app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
  })
import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState({ id: 1, title: '', description: '' });
  const [todos, setTodos] = useState([])

  function handleTitleChange(e){
    setTodo({...todo ,title:e.target.value })
  }
  function handleDescChange(e){
    setTodo({...todo, description:e.target.value })
  }

  function updateTodo(e){
    const newTodo = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: false // adding some contemporary flag incase to strike of the finished todo
    }
    setTodos([...todos, newTodo]);

    // clear the settodo field
    // Clear the input fields by initializing todo with an empty object
    setTodo({ id: todo.id + 1, title: '', description: '' });
  }

  function toggleCompleted(id){
    // updated the completed flag present in todos
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  function removeTodo(id){
    // Filter out the todo with the specified id
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <div className='outer_div'>
      <div className='inner_div'>
        <h1>Todo App</h1>
        Title: <input 
                  type="text" 
                  id="title" 
                  value={todo.title}
                  onChange={handleTitleChange}
                />
        <br /><br />
        Description: <input 
                        type='text' 
                        id='description' 
                        value={todo.description}
                        onChange={handleDescChange}
                      />
        <br /> <br />
        <button className='button' onClick={updateTodo}>Add Todo</button>
        <br/><br/>
        <hr />
        <div><b>Todos:</b><br/><br/>
          {todos.map((todo) => (
            <div key={todo.id}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                <strong>{todo.title}</strong>: {todo.description}
              </span>
              {'   '}
              <button onClick={() => toggleCompleted(todo.id)}>
                {todo.completed ? 'Undo' : 'Strike off'}
              </button>
              {'   '}
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

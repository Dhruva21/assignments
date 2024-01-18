import './App.css'
import { Assignment1 } from './components/Assignment1'
import { Assignment2 } from './components/Assignment2'
import { Assignment3 } from './components/Assignment3'

function App() {
  console.log('App component is called!')
  return (
    <>
      <Assignment1 />
      <Assignment2 />
      <Assignment3 />
    </>
  )
}

export default App

import './App.css';
import React from 'react'
import Form from './Component/Form'
import TodoList from './Component/TodoList';

function App() {  
   return (
    <div className="App">
        <div className='form-container'>  
          <Form/>
        </div>
        <div className='content-container'>
          <TodoList/>
        </div>
    </div>
  );
}

export default App;

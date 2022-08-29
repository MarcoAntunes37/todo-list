import './App.css';
import React from 'react';
import Form from './Component/Form';
import TodoList from './Component/TodoList';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()
function App() {  
  return (
    <QueryClientProvider 
      client={queryClient}>
      <div className="App">
        <div className='form-container'>  
          <Form/>
        </div>
        <div className='content-container'>
          <TodoList/>
        </div>
      </div>      
    </QueryClientProvider>
  );
}

export default App;

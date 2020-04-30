import React from 'react';
import Login from './components/Login';
import Journal from './components/Journal';
import ToDoList from './components/ToDoList';
import './App.css';


function App() {
    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap'}}>
            {/* <Login /> */}
            <Journal />
            <ToDoList />
        </div>
    );
}

export default App;

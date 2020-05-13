import React from 'react';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import Journal from '../components/Journal';
import ToDoList from '../components/ToDoList';
import Menu from '../components/Menu';


export default function JournalPage() {

    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
        <Menu/>
        <Journal/>
        <ToDoList/>
        <Box style={{ width: '100%'}}>
            <Copyright />
        </Box> 
    </div>
    );
}
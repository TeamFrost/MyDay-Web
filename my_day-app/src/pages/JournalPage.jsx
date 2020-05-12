import React from 'react';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import Journal from '../components/Journal';
import ToDoList from '../components/ToDoList';

export default function JournalPage() {

    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap'}}>
            <Journal />
            <ToDoList />
            <Box mt={5}>
                <Copyright />
            </Box> 
        </div>
    );
}
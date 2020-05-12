import React from 'react';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import Calendar from '../components/Calendar';

export default function CalendarPage() {

    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap'}}>
            <Calendar />
            <Box mt={5}>
                <Copyright />
            </Box> 
        </div>
    );
}

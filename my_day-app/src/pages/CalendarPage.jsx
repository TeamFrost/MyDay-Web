import React from 'react';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import Calendar from '../components/Calendar';
import Menu from '../components/Menu';

export default function CalendarPage() {

    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap'}}>
            <Menu/>
            <Calendar />
            <Box style={{ width: '100%', marginTop: 20 }}>
                <Copyright />
            </Box> 
        </div>
    );
}

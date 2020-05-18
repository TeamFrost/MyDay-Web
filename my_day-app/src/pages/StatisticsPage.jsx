import React from 'react';
import Menu from '../components/Menu';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import Statistics from '../components/Statistics';

export default function StatisticsPage() {
    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
            <Menu/>
            <Statistics/>
            <Box style={{ width: '100%'}}>
                <Copyright />
            </Box> 
        </div>
    );
}
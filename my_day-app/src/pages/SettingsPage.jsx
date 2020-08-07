import React from 'react';
import Menu from '../components/Menu';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";

export default function SettingsPage() {
    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
        <Menu/>
        <Box style={{ width: '100%'}}>
            <Copyright />
        </Box> 
    </div>
    );
}
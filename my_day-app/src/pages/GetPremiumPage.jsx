import React from 'react';
import Menu from '../components/Menu';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import Premium from '../components/Premium';

export default function GetPremium() {
    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
        <Menu/>
        <Premium/>
        <Box style={{ width: '100%'}}>
            <Copyright />
        </Box> 
    </div>
    );
}
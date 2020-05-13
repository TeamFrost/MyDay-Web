import React from 'react';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import Menu from '../components/Menu';

export default function FriendsPage() {

    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
            {/* <Menu/> */}
            <Box mt={5} style={{ width: '100%'}}>
                <Copyright />
            </Box> 
        </div>
    );
}
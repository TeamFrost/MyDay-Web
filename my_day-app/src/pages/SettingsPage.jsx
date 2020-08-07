import React from 'react';
import Menu from '../components/Menu';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import IconSelect from '../components/IconSelect';
import Namechanger from '../components/NameChanger';

export default function SettingsPage() {
    return (
        <div className="App" style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            <Menu />
            <div>
                <IconSelect />
                <Namechanger />
            </div>
            <Box style={{ width: '100%' }}>
                <Copyright />
            </Box>
        </div>
    );
}
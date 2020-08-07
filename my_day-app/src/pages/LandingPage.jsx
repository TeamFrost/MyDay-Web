import React from 'react';
import Menu from '../components/Menu';
import TodayCard from '../components/TodayCard';
import TomorrowCard from '../components/TomorrowCard';
import Copyright from '../helpers/Copyright';
import Box from "@material-ui/core/Box";
import Weather from '../components/Weather';
import ShowStars from '../components/ShowStars';

export default function LandingPage() {
    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap'}}>
            <Menu />
            <TodayCard />
            <TomorrowCard />
            <ShowStars />
            {/* <Weather /> */}
            <Box style={{ width: '100%'}}>
                <Copyright />
            </Box> 
        </div>
    );
}
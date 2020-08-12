import React from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css';
import { Router, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { createBrowserHistory } from 'history'
import { Private } from './components/Private'
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import CalendarPage from './pages/CalendarPage';
import JournalPage from './pages/JournalPage';
import FriendsPage from './pages/FriendsPage';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';
import Logout from './pages/Logout';
import GetPremiumPage from './pages/GetPremiumPage';
import Menu from './components/Menu';

function App() {
    const history = createBrowserHistory();

    return (
        <div className="App" style={{display: 'flex', flexWrap: 'wrap'}}>
            {/* <Journal /> */}
            {/* <ToDoList /> */}
            {/*<Login />*/}
            {/* <Calendar /> */}
            {/* <Menu /> */}

            <Router history={history}>
                <Route exact path='/' component={Login} />
                <Route path='/register' component={Register} />

                <Private path='/homepage' component={Homepage} />
                <Private path='/forgotpassword' component={ForgotPassword} />
                <Private path='/dayoverview' component={LandingPage} />
                <Private path='/calendar' component={CalendarPage} />
                <Private path='/journal' component={JournalPage} />
                <Private path='/friends' component={FriendsPage} />
                <Private path='/logout' component={Logout} />
                <Private path='/statistics' component={StatisticsPage} />
                <Private path='/settings' component={SettingsPage} />
                <Private path='/premium' component={GetPremiumPage} />
            </Router>
            
        </div>
    );
}

export default App;

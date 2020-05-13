import React from 'react';
import {Paper, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Default from '../img/default.png';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import PieChartTwoToneIcon from '@material-ui/icons/PieChartTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import GradeTwoToneIcon from '@material-ui/icons/GradeTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import Logo from '../img/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    height: 680,
    margin: 80,
    borderRadius: 20,
  
},
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 20,
  },
  rootname: {
    width: '100%',
	maxWidth: 350,
    height: 80,
  },
  rootmenu: {
    width: '80%',
	maxWidth: 350,
	maxHeight: 350,
    marginLeft: 25,
    //backgroundColor: theme.palette.background.paper,
  },
  rooticon: {
	// backgroundColor: theme.palette.background.paper,
	borderRadius: 100,
	maxHeight: 50,
    '&:hover': {
      color: '#508ff4'
	}
  },
  itemspecial:{
	borderRadius: 100,
	maxHeight: 50,
	'&:hover': {
		color: '#ffb295'
	}
}}));

export default function Menu() {
  const classes = useStyles();

  return (
	  <Paper className={classes.root} elevation={10}>
                      
            <List className={classes.rootname}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="user" src={Default} className={classes.large} />
                </ListItemAvatar>
               <ListItemText disableTypography primary={<Typography variant="h6" style={{ fontWeight: 'bold' }}>Raul Licaret</Typography>}/>
              </ListItem>
            </List>
          
            <hr className={'hrGrey'}/>

            <div className={classes.rootmenu}>
              <List>
                <ListItem button className={classes.rooticon}>
                  <ListItemIcon>
                    <DashboardTwoToneIcon style={{ color: '#508ff4' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Day Overview" />
                </ListItem>
                <ListItem button className={classes.rooticon}>
                  <ListItemIcon>
                    <CalendarTodayTwoToneIcon style={{ color: '#508ff4' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Calendar" />
                </ListItem>
                <ListItem button className={classes.rooticon}>
                  <ListItemIcon>
                    <BookTwoToneIcon style={{ color: '#508ff4' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Journal" />
                </ListItem>
                <ListItem button className={classes.rooticon}>
                  <ListItemIcon>
                    <PieChartTwoToneIcon style={{ color: '#508ff4' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Statisics" />
                </ListItem>
                <ListItem button className={classes.rooticon}>
                  <ListItemIcon>
                    <PeopleAltTwoToneIcon style={{ color: '#508ff4' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Friends" />
                </ListItem>
                <ListItem button className={classes.rooticon}>
                  <ListItemIcon>
                    <SettingsTwoToneIcon style={{ color: '#508ff4' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Profile Settings" />
                </ListItem>
                <ListItem button className={classes.itemspecial}>
                  <ListItemIcon>
                    <GradeTwoToneIcon style={{ color: '#ffb295' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Get Premium" />
                </ListItem>
              </List>
            </div> 
           
            <div>
              <img src={Logo} alt={"logo"} style={{width: '25%', height: '25%'}}/>
            </div>  

            <hr className={'hrGrey'}/>


            <div className={classes.rootmenu}>
            <List>
              <ListItem button className={classes.rooticon}>
                  <ListItemIcon>
                    <ExitToAppTwoToneIcon style={{ color: '#508ff4'}}/>
                  </ListItemIcon>
               <ListItemText primary="Logout"/>
              </ListItem>
            </List>
            </div>
      </Paper>
  );
}

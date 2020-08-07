import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import BookTwoToneIcon from "@material-ui/icons/BookTwoTone";
import PieChartTwoToneIcon from "@material-ui/icons/PieChartTwoTone";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import GradeTwoToneIcon from "@material-ui/icons/GradeTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import Default from "../img/default.png";
import Red from '../img/icons/red.png';
import Cyan from '../img/icons/cyan.png';
import DarkBlue from '../img/icons/darkblue.png';
import Purple from '../img/icons/purple.png';
import Green from '../img/icons/green.png';
import Yellow from '../img/icons/yellow.png';
import Grey from '../img/icons/grey.png';

const avatar = {
    'default.png': Default,
    'red.png': Red,
    'cyan.png': Cyan,
    'darkblue.png': DarkBlue,
    'purple.png': Purple,
    'green.png': Green,
    'yellow.png': Yellow,
    'grey.png': Grey,
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
        height: 730,
        margin: 80,
        borderRadius: 20,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: 20,
    },
    rootname: {
        width: "100%",
        maxWidth: 350,
        height: 80,
    },
    rootmenu: {
        width: "80%",
        maxWidth: 350,
        maxHeight: 350,
        marginLeft: 25,
        //backgroundColor: theme.palette.background.paper,
    },
    rooticon: {
        // backgroundColor: theme.palette.background.paper,
        borderRadius: 100,
        maxHeight: 50,
        "&:hover": {
            color: "#508ff4",
        },
    },
    itemspecial: {
        borderRadius: 100,
        maxHeight: 50,
        "&:hover": {
            color: "#ffb295",
        },
    },
}));

export default function Menu() {
	const classes = useStyles();
	const firstName = JSON.parse(localStorage.getItem('loggedUser')).FirstName;
	const lastName = JSON.parse(localStorage.getItem('loggedUser')).LastName;
    const avatarString = JSON.parse(localStorage.getItem('loggedUser')).ProfilePicture;

	const fullName = `${firstName} ${lastName}`;
	const showFullName = fullName.length > 19 ? fullName.substring(0, 16) + '...' : fullName;

    return (
        <Paper className={classes.root} elevation={10}>
            <List className={classes.rootname}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar
                            alt="user"
                            src={avatar[avatarString]}
                            className={classes.large}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography
                        primary={
                            <Typography
                                variant="h6"
                                style={{ fontWeight: "bold" }}
                            >
                                {showFullName}
                            </Typography>
                        }
                    />
                </ListItem>
            </List>

            <hr className={"hrGrey"} />

            <div className={classes.rootmenu}>
                <List>
                    <Link to={'dayoverview'} style={{ color: '#000000', textDecoration: 'none' }}>
                        <ListItem button className={classes.rooticon}>
                            <ListItemIcon>
                                <DashboardTwoToneIcon
                                    style={{ color: "#508ff4" }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Day Overview" />
                        </ListItem>
                    </ Link>
                    <Link to={'calendar'} style={{ color: '#000000', textDecoration: 'none' }}>
                        <ListItem button className={classes.rooticon}>
                            <ListItemIcon>
                                <CalendarTodayTwoToneIcon
                                    style={{ color: "#508ff4" }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Calendar" />
                        </ListItem>
                    </Link>
                    <Link to={'journal'} style={{ color: '#000000', textDecoration: 'none' }}>
                         <ListItem button className={classes.rooticon}>
                        
                        <ListItemIcon>
                            <BookTwoToneIcon style={{ color: "#508ff4" }} />
                        </ListItemIcon>
                            <ListItemText primary="Journal" />
                    
                        </ListItem>
                    </Link>
                    <Link to={'statistics'} style={{ color: '#000000', textDecoration: 'none' }}>
                        <ListItem button className={classes.rooticon}>
                            <ListItemIcon>
                                <PieChartTwoToneIcon style={{ color: "#508ff4" }} />
                            </ListItemIcon>
                            <ListItemText primary="Statistics" />
                        </ListItem>
                    </Link>
                    <Link to={'friends'} style={{ color: '#000000', textDecoration: 'none' }}>
                        <ListItem button className={classes.rooticon}>
                            <ListItemIcon>
                                <PeopleAltTwoToneIcon
                                    style={{ color: "#508ff4" }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Friends" />
                        </ListItem>
                    </Link>
                    <Link to={'settings'} style={{ color: '#000000', textDecoration: 'none' }}>
                        <ListItem button className={classes.rooticon}>
                            <ListItemIcon>
                                <SettingsTwoToneIcon style={{ color: "#508ff4" }} />
                            </ListItemIcon>
                            <ListItemText primary="Profile Settings" />
                        </ListItem>
                    </Link>
                    <Link to={'premium'} style={{ color: '#000000', textDecoration: 'none' }}>
                        <ListItem button className={classes.itemspecial}>
                            <ListItemIcon>
                                <GradeTwoToneIcon style={{ color: "#ffb295" }} />
                            </ListItemIcon>
                            <ListItemText primary="Get Premium" />
                        </ListItem>
                    </Link>
                </List>
            </div>

            <div>
                <br/>
                <img
                    src={Logo}
                    alt={"logo"}
                    style={{ width: "32%", height: "30%" }}
                />
            </div>
            
            <hr className={"hrGrey"} />

            <div className={classes.rootmenu}>
                <List>
                    <Link to={'logout'} style={{ color: '#000000', textDecoration: 'none' }}>
                        <ListItem button className={classes.rooticon}>
                            <ListItemIcon>
                                <ExitToAppTwoToneIcon
                                    style={{ color: "#508ff4" }}
                                />
                            </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                    </Link>
                </List>
            </div>
        </Paper>
    );
}

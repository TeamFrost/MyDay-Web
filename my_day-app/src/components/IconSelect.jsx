import React from 'react';
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Default from "../img/default.png";
import Red from '../img/icons/red.png';
import Cyan from '../img/icons/cyan.png';
import DarkBlue from '../img/icons/darkblue.png';
import Purple from '../img/icons/purple.png';
import Green from '../img/icons/green.png';
import Yellow from '../img/icons/yellow.png';
import Grey from '../img/icons/grey.png';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "row",
        width: 1200,
        height: 250,
        margin: 80,
        marginLeft: 20,
        borderRadius: 20,
    },
    buttonStyle: {
        width: 100,
        height: 180,
        margin: 20,
        marginTop: -6,
    },
    imageStyle: {
        width: '100%',
    }
}));

export default function IconSelect() {

    const classes = useStyles();

    const onIconClick = (value) => {
        const fetchData = async () => {
            const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
            const userId = currentUser.ID;
            const options = {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + currentUser.token,
                    "Content-Type": "application/json",
                },
            };

            await fetch(
                `http://localhost:3300/users/avatar/${userId}/${value}`,
                options
            );
        };

        fetchData().catch((err) => console.log(err));
        
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

        const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
        currentUser.ProfilePicture = value;
        localStorage.setItem('loggedUser', JSON.stringify(currentUser));
        window.location.reload(false);
    }

    return (
        <Paper className={classes.root} elevation={10}>
            <div style={{width: 1200, maxHeight: 80}}>
               <br />
                <h2 align={"center"} style={{marginBlockStart: 0}}>
                    Choose Your Avatar
                </h2>
                <hr className={"hrGrey"} />
            </div>
            <div>    
            <Button className={classes.buttonStyle} onClick={() => onIconClick('default.png')}>
                <img src={Default} className={classes.imageStyle} />
            </Button>
            <Button className={classes.buttonStyle} onClick={() => onIconClick('darkblue.png')}>
                <img src={DarkBlue} className={classes.imageStyle} />
            </Button>
            <Button className={classes.buttonStyle} onClick={() => onIconClick('red.png')}>
                <img src={Red} className={classes.imageStyle} />
            </Button>
            <Button className={classes.buttonStyle} onClick={() => onIconClick('purple.png')}>
                <img src={Purple} className={classes.imageStyle} />
            </Button>
            <Button className={classes.buttonStyle} onClick={() => onIconClick('cyan.png')}>
                <img src={Cyan} className={classes.imageStyle} />
            </Button>
            <Button className={classes.buttonStyle} onClick={() => onIconClick('green.png')}>
                <img src={Green} className={classes.imageStyle} />
            </Button>
            <Button className={classes.buttonStyle} onClick={() => onIconClick('yellow.png')}>
                <img src={Yellow} className={classes.imageStyle} />
            </Button>
            <Button className={classes.buttonStyle} onClick={() => onIconClick('grey.png')}>
                <img src={Grey} className={classes.imageStyle} />
            </Button>
            </div>
        </Paper>
    );
}


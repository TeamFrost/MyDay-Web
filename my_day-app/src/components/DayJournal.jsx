import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
      margin: 0,
    },
    text: {
        maxHeight: 175,
        paddingLeft: 20,
        fontSize: 20
    },
    buttonIcon: {
        marginLeft: 390,
        marginRight: 1,
    },
}));

export default function Journal(props) {
    const classes = useStyles();
    const { id, entry, description, date, updateJournal } = props;
    const postDate = date.replace('T', ' ').replace('.000Z', '').split(/[- :]/);
    postDate[1]--;
    const dateObject = new Date(...postDate);
    const monthIndex = dateObject.getMonth();
    const day = dateObject.getDate();
    const weekDay = dateObject.getDay();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const deleteData = async () => {
        const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + currentUser.token,
                'Content-Type': 'application/json'
            }
        }
        await fetch(`http://localhost:3300/journal/deleteData/${id}`, requestOptions)
            .then(res => {
                console.log(res);
                props.updateJournal();
            })
            .catch(err => {
                console.log(err);
                props.updateJournal();
            })
    }

    return (
        <div className={classes.root}>
            <h2 className={classes.text}>
                <span style={{ color: '#969798' }}>Entry</span>
                <span style={{ color: '#508FF4' }}>
                    {' #' + entry + ' - ' + daysOfTheWeek[weekDay] + ', ' + day + ' ' + months[monthIndex]}
                </span>
            </h2>
            <p className={classes.text} style={{fontSize: '1.4rem'}}>{description}</p>
            <br/><br/>
            <FormControlLabel className={classes.buttonIcon}
                control={<Checkbox icon={<StarBorderIcon style={{ color: "#ffb295" }} />} checkedIcon={<StarIcon style={{ color: "#ffb295" }}/>}  />}
             />
            <IconButton>
                <EditIcon style={{ color: "rgb(76, 137, 233)" }}/>
            </IconButton>
            <IconButton>
                <HighlightOffIcon style={{ color: "rgb(208, 20, 20)" }}/>
            </IconButton>
            <hr className={'hrGrey'}/>
        </div>
    )
}
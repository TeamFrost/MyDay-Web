import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      margin: 0
    },
    text: {
        paddingLeft: 20,
        fontSize: 20
    },
}));

export default function Journal(props) {
    const classes = useStyles();
    const { entry, description, date } = props;
    const postDate = date.replace('T', ' ').replace('.000Z', '').split(/[- :]/);
    postDate[1]--;
    const dateObject = new Date(...postDate);
    const monthIndex = dateObject.getMonth();
    const day = dateObject.getDate();
    const weekDay = dateObject.getDay();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div className={classes.root}>
            <h2 className={classes.text}>
                <span style={{color: '#969798'}}>Entry</span>
                <span style={{color: '#508FF4'}}>
                    { ' #' + entry + ' - ' + daysOfTheWeek[weekDay] + ', ' + day + ' ' + months[monthIndex] }
                </span>
            </h2>
            <p className={classes.text} style={{fontSize: 15}}>{description}</p>
            <br/><br/><br/><br/><br/>
            <hr className={'hrGrey'}/>
        </div>
    )
}
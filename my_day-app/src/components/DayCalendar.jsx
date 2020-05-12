import React from 'react';
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MultiColorProgressBar from './MultiColorProgressBar';

const useStyles = makeStyles(theme => ({
    dayPaper: {
        width: 140,
        height: 95,
        background: '#EBF2F7',
        margin: 7
    },
    dayOfWeek: {
        color: '#B3B8BD',
        margin: 0,
        marginTop: 15,
        marginLeft: 15,
        padding: 0,
        fontSize: 12,
        textAlign: 'left',
        fontFamily: 'Roboto'
    },
    dayOfMonth: {
        color: '#52575D',
        margin: 0,
        marginTop: 5,
        marginLeft: 15,
        padding: 0,
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'Roboto'
    }
}));

export default function DayCalendar(props) {
    const classes = useStyles();
    const {activities, dayOfWeek, dayOfMonth} = props;
    let activitiesBar = [];

    if (activities) {
        activities.map((activity, key) => {
            activitiesBar.push(activity);
        });
    }

    return (
        <Paper className={classes.dayPaper}>
            <p className={classes.dayOfWeek}>{dayOfWeek}</p>
            <p className={classes.dayOfMonth}>{dayOfMonth}</p>
            {Array.isArray(activitiesBar) && activitiesBar.length ?
                <MultiColorProgressBar activities={activitiesBar}/> : null}
        </Paper>
    )
}

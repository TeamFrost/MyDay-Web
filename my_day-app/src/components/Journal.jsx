import React from 'react';
import {useState, useEffect} from 'react';
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DayJournal from "./DayJournal";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    paper: {
        width: 605,
        height: 797,
        overflow: 'auto',
        textAlign: 'left',
        borderRadius: 15
    },
    titleH2: {
        fontSize: 25,
        paddingLeft: 20
    }
}));

export default function Journal() {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:3300/journal')
                .then(res => res.json())
                .then(
                    result => {
                        setData(result.data);
                    },
                    error => {
                        throw error;
                    }
                );
        };
        fetchData().catch(err => console.log(err));
    }, []);

    let dayJournalKey = 0; // change
    return (
        <div className={classes.root}>
            <Paper id={"style-1"} className={classes.paper} elevation={10}>
                <h2 className={classes.titleH2}>Journal</h2>
                <br/>
                <hr className={'hrGrey'}/>
                {
                    data.map((val, key) => {
                        return <DayJournal key={dayJournalKey++} date={val.Date} description={val.Description}
                                           entry={val.Entry}/>
                    })
                }
            </Paper>
        </div>
    )
}

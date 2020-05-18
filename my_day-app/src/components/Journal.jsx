import React from 'react';
import {useState, useEffect} from 'react';
import {Paper, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DayJournal from "./DayJournal";
import AddIcon from '@material-ui/icons/Add';
import {Fab} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(8),
        },
    },
    paper: {
        width: 550,
        height: 730,
        margin: 80,
        marginLeft: 20,
        overflow: 'auto',
        textAlign: 'left',
        borderRadius: 15
    },
    titleH2: {
        fontSize: 25,
        paddingLeft: 20
    },
}));

export default function Journal() {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + currentUser.token,
                'Content-Type': 'application/json'
            }
        }
        const fetchData = async () => {
            await fetch('http://localhost:3300/journal/getAll', requestOptions)
                .then(res => res.status === 200 ? res.text() : null)
                .then(
                    result => {
                        setData(JSON.parse(result));
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
            <Grid container>
                <Grid xs={10}>
                    <h2 className={classes.titleH2}>Journal</h2>
                </Grid>
                
                <Grid xs={1}>
                <Fab color="primary" aria-label="add" style={{backgroundColor: '#508FF4', marginTop: 13,}}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
                <hr className={'hrGrey'}/>
                {
                    data.map((val, key) => {
                        return <DayJournal key={dayJournalKey++} date={val.Date} description={val.Description} entry={val.Entry}/>
                    })
                }
            </Paper>
        </div>
    )
}

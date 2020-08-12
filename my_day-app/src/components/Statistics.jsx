import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import getpremium from '../img/getpremium.png';

const useStyle = makeStyles(theme => ({
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
        width: 630,
        height: 350,
        overflow: 'auto',
        textAlign: 'center',
        borderRadius: 20,
        margin: 80,
        marginLeft: 20,
        marginBottom: 5,
        marginRight: 5,
    },
    paperSecond: {
        width: 550,
        height: 350,
        overflow: 'auto',
        textAlign: 'left',
        borderRadius: 20,
        marginLeft: 20,
        marginBottom: 5,

        marginTop: 20,
    },
    paperThird: {
        width: 700,
        height: 350,
        overflow: 'auto',
        textAlign: 'center',
        borderRadius: 20,
        marginLeft: 1,
        marginBottom: 5,
        marginRight: 5,
        marginTop: 20,
    }
}))

export default function Statistics() {
    const classes = useStyle();
    return (
        <div>
            <Grid container spacing={12}>
                <Grid item xs={6} spacing={3}>
                    <Paper className={classes.paper} elevation={10}>
                        <LineChart />
                    </Paper>
                </Grid>
                <Grid item xs spacing={3}>
                    <Paper className={classes.paper} elevation={10}>
                        <BarChart />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs>
                    <Paper className={classes.paperSecond} elevation={10}>
                        <PieChart />
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paperThird} elevation={10}>
                         <img src={getpremium} style={{ marginTop: 30 }} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
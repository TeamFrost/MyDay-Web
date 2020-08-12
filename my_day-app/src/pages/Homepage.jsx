import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../img/logo.png';
import Copyright from "../helpers/Copyright";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 450,
        height: 800,
        borderRadius: 20,
        marginLeft: 750,
        marginTop: 100,
        paddingTop: 10,
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: '#508FF4',
        color: '#FFFFFF',
        height: 40,
    },
}));


export default function Homepage() {
    const classes = useStyles();

    return (
        <div>
        <Paper className={classes.root} elevation={10}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
            <img src={Logo} alt={"logo"} style={{width: '50%', height: '50%'}}/>
                <br/>
                <Typography component="h1" variant="h3">
                    Get through your day without a worry.
                </Typography>
                <br/>
                <Link to={'dayoverview'} style={{ color: '#000000', textDecoration: 'none', width: '100%'}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Go to planner
                </Button>
                </Link>
            </div>
            <br/><br/><br/>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
        </Paper>
        </div>
    );
}

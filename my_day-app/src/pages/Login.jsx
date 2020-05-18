import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../img/logo.png';
import Copyright from "../helpers/Copyright";
import { Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 450,
        height: 730,
        borderRadius: 20,
        marginLeft: 750,
        marginTop: 100,
        paddingTop: 10,
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: '#508FF4',
        color: '#FFFFFF',
    },
}));

const initialUserData = {
    email: '',
    password: ''
}

export default function Login() {
    //! LOGGED USER SHOULD NOT BE ABLE TO ACCESS THIS PAGE. SAME FOR REGISTER !!!
    const classes = useStyles();
    const [userData, setUserData] = useState(initialUserData);
    const [isRedirect, setIsRedirect] = useState(false);
    const history = createBrowserHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        const field = { [name]: value }

        setUserData({ 
            ...userData,
            ...field
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        // send to API userData
        const fetchData = async () => {
            const API_PATH = `http://localhost:3300/users/authenticate`;
            const reqOpts = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(userData)
            }

            return await fetch(API_PATH, reqOpts)
                .then(res => res.status === 200 ? res.text() : null)
                .then(res => {
                    if (res) {
                        localStorage.setItem('loggedUser', res);
                        history.push("/homepage");
                        setIsRedirect(true);
                    }
                    else {
                        console.log("Something went wrong")
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsRedirect(false);
                })
        }

        fetchData();
    }

    return (
        <div>
        <Paper className={classes.root} elevation={10}>
        <Container component="main" maxWidth="xs" >
            {console.log(isRedirect)}
            {isRedirect && <Redirect
                to={{
                    pathname: "/homepage"
                }}
            />}
            <CssBaseline/>
            <div className={classes.paper} >
                <img src={Logo} alt={"logo"} style={{width: '45%', height: '45%'}}/>
                <br/>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgotpassword" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
        </Paper>
        </div>
    );
}

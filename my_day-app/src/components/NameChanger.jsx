import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    paper: {
        width: 500,
        height: 400,
        overflow: 'auto',
        textAlign: 'center',
        borderRadius: 20,
        marginLeft: 20,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: "#508FF4",
        color: "#FFFFFF",
        width: 120,
        height: 45,
        fontSize: '16px',
        marginTop: 50,
        marginRight: 100,
        marginLeft: 100,
    },
    textfield: {
        width: '60%',
        marginTop: 40
    }
}));

const initialUserData = {
    firstName: JSON.parse(localStorage.getItem('loggedUser')).FirstName, 
    lastName: JSON.parse(localStorage.getItem('loggedUser')).LastName,
}

export default function Namechanger() {
    const classes = useStyles();
    const [userData, setUserData] = useState(initialUserData);
    const userId = JSON.parse(localStorage.getItem('loggedUser')).ID;
    const handleSubmit = e => {
        e.preventDefault();

        const fetchData = async () => {
            const API_PATH = `http://localhost:3300/users/${userId}/${userData.firstName}/${userData.lastName}`;
            const reqOpts = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }

            await fetch(API_PATH, reqOpts)
                .then(res => {
                    const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
                    currentUser.FirstName = userData.firstName;
                    currentUser.LastName = userData.lastName;
                    localStorage.setItem('loggedUser', JSON.stringify(currentUser));
                    window.location.reload(false);
                })
                .catch(err => console.log(err))
        }
        fetchData();
    };

    const handleChange = e => {

        const { name, value } = e.target;
        const field = { [name]: value };

        setUserData({
            ...userData,
            ...field
        });
    }


    return (
        <div>
            <Paper className={classes.paper} elevation={10}>
                <div>
                    <h2 align={"center"}>
                        Change Your Name
                </h2>
                    <hr className={"hrGrey"} />
                </div>
                <div>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField className={classes.textfield}
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            defaultValue={userData.firstName}
                            onChange={handleChange}

                        />
                        <TextField className={classes.textfield}
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            name="lastName"
                            defaultValue={userData.lastName}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                    </Button>
                    </form>
                </div>
            </Paper>
        </div>
    );

}

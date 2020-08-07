import React from "react";
import { useState, useEffect } from "react";
import "date-fns";
import {
    Paper,
    Grid,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DayJournal from "./DayJournal";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFormatServer from "../helpers/DateFormatServer";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
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
        overflow: "auto",
        textAlign: "left",
        borderRadius: 15,
    },
    titleH2: {
        fontSize: 25,
        paddingLeft: 20,
    },
    dialog: {
        padding: 200,
    },
}));

const nowDate = new Date();
const currentDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
);

const initialDialogValues = {
    description: "",
    selectedDate: currentDate,
};

export default function Journal() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [dialogValues, setDialogValues] = useState(initialDialogValues);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
        const userId = currentUser.ID;
        const options = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + currentUser.token,
                "Content-Type": "application/json",
            },
        };
        const fetchData = async () => {
            await fetch(
                `http://localhost:3300/journal/getAll/${userId}`,
                options
            )
                .then((res) => (res.status === 200 ? res.text() : null))
                .then(
                    (result) => {
                        setData(JSON.parse(result));
                    },
                    (error) => {
                        throw error;
                    }
                );
        };

        fetchData().catch((err) => console.log(err));
    }, [refresh]);

    const reloadJournal = () => {
        setRefresh(!refresh);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDialogValues({
            ...dialogValues,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setDialogValues({
            ...dialogValues,
            selectedDate: DateFormatServer(date),
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setDialogValues({
            ...dialogValues,
            selectedDate: DateFormatServer(dialogValues["selectedDate"]),
        });

        const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
        const options = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + currentUser.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...dialogValues,
                userId: currentUser.ID,
            }),
        };

        const sendData = async () => {
            await fetch("http://localhost:3300/journal/addEntry", options)
                .then((res) => {
                    console.log(res);
                    setDialogValues(initialDialogValues);
                    handleDialogClose();
                    reloadJournal();
                })
                .catch((err) => console.log(err));
        };

        sendData();
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    let dayJournalKey = 0; // change
    return (
        <div className={classes.root}>
            <Paper id={"style-1"} className={classes.paper} elevation={10}>
                <Grid container>
                    <Grid xs={10}>
                        <h2 className={classes.titleH2}>Journal</h2>
                    </Grid>

                    <Grid xs={1}>
                        <Fab
                            onClick={handleDialogOpen}
                            color="primary"
                            aria-label="add"
                            style={{
                                backgroundColor: "#508FF4",
                                marginTop: 13,
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
                <hr className={"hrGrey"} />
                {data.map((val) => {
                    return (
                        <DayJournal
                            key={dayJournalKey++}
                            id={val.Id}
                            date={val.Date}
                            description={val.Description}
                            entry={val.Entry}
                            updateJournal={reloadJournal}
                        />
                    );
                })}
            </Paper>

            <Dialog
                open={dialogOpen}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.dialog}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add a new memory in Journal"}
                </DialogTitle>
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        name="description"
                                        value={dialogValues.description}
                                        onChange={handleInputChange}
                                    />
                                    <br />
                                    <br />
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date"
                                            value={dialogValues.selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <br />
                                    <br />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleDialogClose}>
                            CANCEL
                        </Button>
                        <Button type="submit" color="primary" autoFocus>
                            SAVE
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

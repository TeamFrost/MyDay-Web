import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import planet from "../img/planet.png";
import {
    Button,
    Paper,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Fab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFormatServer from "../helpers/DateFormatServer";
import AddIcon from "@material-ui/icons/Add";

const BlueCheckbox = withStyles({
    root: {
        color: "#508FF4",
        "&$checked": {
            color: "#508FF4",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    paper: {
        width: 550,
        height: 500,
        overflow: "auto",
        textAlign: "left",
        borderRadius: 20,
        margin: 80,
        marginLeft: 20,
        marginBottom: 5,
        marginRight: 5,
    },
    titleH2: {
        fontSize: 25,
        paddingLeft: 20,
    },
    checkbox: {
        marginLeft: 30,
        marginRight: 10,
    },
    fromGroup: {
        marginTop: 20,
    },
    photo: {
        position: "relative",
        width: 165,
        height: 135,
        top: "70%",
        right: "50%",
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
    startDate: currentDate,
    recurring: false,
    repeatInterval: 1
};

export default function ToDoList() {
    const classes = useStyle();
    const [checked, setChecked] = useState({});
    const [text, setText] = useState({});
    const [showDialogQuestion, setShowDialogQuestion] = useState(false);
    const [evCheckedParam, setEvCheckedParam] = useState(0);
    const [evNameParam, setEvNameParam] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [dialogValues, setDialogValues] = useState(initialDialogValues);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
        const userId = currentUser.ID;
        const API_PATH = `http://localhost:3300/todo/getAll/${userId}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + currentUser.token,
                "Content-Type": "application/json",
            },
        };

        const fetchData = async () => {
            await fetch(API_PATH, options)
                .then((res) => res.json())
                .then(
                    (result) => {
                        let checkedArr = {};
                        let textArr = {};

                        console.log(result);

                        result.map((val, key) => {
                            checkedArr[`check${val.ID}`] = val.Checked === 1;
                            textArr[`check${val.ID}`] = val.Description;
                        });

                        setChecked(checkedArr);
                        setText(textArr);
                    },
                    (error) => {
                        throw error;
                    }
                );
        };

        fetchData().catch((err) => console.log(err));
    }, [refresh]);

    const updateData = (checkedParam, nameParam) => {
        const idParam = nameParam.replace("check", "");
        const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
        const userId = currentUser.ID;
        const API_PATH = `http://localhost:3300/todo/updateData/${checkedParam}/${idParam}`;
        const options = {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + currentUser.token,
                "Content-Type": "application/json",
            },
        };
        const fetchData = async () => {
            await fetch(API_PATH, options)
                .then((res) => res.json())
                .then(
                    (result) => {
                        console.log(result.data.message);
                        reloadToDo();
                    },
                    (error) => {
                        throw error;
                    }
                );
        };
        fetchData().catch((err) => console.log(err));

        setChecked({ ...checked, [nameParam]: checkedParam });
    };

    const handleChangeChecked = (event) => {
        const checkedParam = event.target.checked ? 1 : 0;
        const nameParam = event.target.name;

        setEvCheckedParam(checkedParam);
        setEvNameParam(nameParam);

        if (checkedParam) {
            updateData(checkedParam, nameParam);
        } else {
            handleDialogQuestionOpen();
        }
    };

    const handleDialogQuestionOpen = () => {
        setShowDialogQuestion(true);
    };

    const handleDialogQuestionClose = (change) => {
        setShowDialogQuestion(false);
    };

    const reloadToDo = () => {
        setRefresh(!refresh);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setDialogValues({
            ...dialogValues,
            startDate: DateFormatServer(dialogValues.startDate)
        })

        const addData = async () => {
            const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
            const userId = currentUser.ID;
            const API_PATH = `http://localhost:3300/todo/addToDo`;
            const options = {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + currentUser.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...dialogValues, userId })
            };

            await fetch(API_PATH, options)
                .then(res => {
                    console.log(res);
                    handleDialogClose()
                    reloadToDo();
                })
                .catch((err) => console.log(err))
        }

        addData();
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
            startDate: DateFormatServer(date),
        });
    };

    const makeEventRecurring = () => {
        setDialogValues({
            ...dialogValues,
            recurring: !dialogValues.recurring
        })
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={10}>
                <Grid container>
                    <Grid xs={10}>
                        <h2 className={classes.titleH2}>To do list</h2>
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

                {Object.keys(checked).map((val, key) => {
                    const keyIndex = Object.keys(checked)[key];

                    return (
                        <FormGroup row className={classes.fromGroup} key={key}>
                            <FormControlLabel
                                control={
                                    <BlueCheckbox
                                        className={classes.checkbox}
                                        checked={checked[keyIndex]}
                                        onChange={handleChangeChecked}
                                        name={keyIndex}
                                        color="primary"
                                    />
                                }
                                label={
                                    !checked[keyIndex] ? (
                                        text[keyIndex]
                                    ) : (
                                            <s>{text[keyIndex]}</s>
                                        )
                                }
                            />
                        </FormGroup>
                    );
                }, checked)}
            </Paper>

            <Dialog
                open={showDialogQuestion}
                onClose={handleDialogQuestionClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to uncheck this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleDialogQuestionClose(0)}
                        variant="contained"
                        style={{ backgroundColor: "#ff4935", color: "#ffffff" }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            handleDialogQuestionClose(1);
                            updateData(evCheckedParam, evNameParam);
                        }}
                        variant="contained"
                        style={{ backgroundColor: "#35b93a", color: "#ffffff" }}
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={dialogOpen}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.dialog}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add a new ToDo item"}
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
                                            label="Start Date"
                                            value={dialogValues.startDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <br />
                                    <br />
                                    <FormGroup
                                        row
                                        className={classes.fromGroup}
                                    >
                                        <FormControlLabel
                                            control={
                                                <BlueCheckbox
                                                    className={classes.checkbox}
                                                    checked={dialogValues.recurring}
                                                    onChange={makeEventRecurring}
                                                    name="recurring"
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                "Do you want to make this event reccuring?"
                                            }
                                        />
                                    </FormGroup>
                                    {dialogValues.recurring && (
                                        <TextField
                                            label="Days no"
                                            name="repeatInterval"
                                            input
                                            type="number"
                                            InputProps={{
                                                inputProps: { min: 1, max: 100 },
                                            }}
                                            value={dialogValues.repeatInterval}
                                            onChange={handleInputChange}
                                        />
                                    )}
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

            <img src={planet} className={classes.photo} />
        </div>
    );
}

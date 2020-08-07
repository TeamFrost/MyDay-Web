import React, {useState, useEffect} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import planet from '../img/planet.png';
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
    Grid
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const BlueCheckbox = withStyles({
    root: {
        color: '#508FF4',
        '&$checked': {
            color: '#508FF4',
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        }
    },
    paper: {
        width: 550,
        height: 500,
        overflow: 'auto',
        textAlign: 'left',
        borderRadius: 20,
        margin: 80,
        marginLeft: 20,
        marginBottom: 5,
        marginRight: 5,
    },
    titleH2: {
        fontSize: 25,
        paddingLeft: 20
    },
    checkbox: {
        marginLeft: 30,
        marginRight: 10
    },
    fromGroup: {
        marginTop: 20
    },
    photo: {
        position: 'relative',
        width: 165,
        height: 135,
        top: '70%',
        right: '50%',
    },
}));

export default function ToDoList() {
    const classes = useStyle();
    const [checked, setChecked] = useState({});
    const [text, setText] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [evCheckedParam, setEvCheckedParam] = useState(0);
    const [evNameParam, setEvNameParam] = useState('');

    const updateData = (checkedParam, nameParam) => {
        const idParam = nameParam.replace('check', '');
        const API_PATH = `http://localhost:3300/updatetodo?chec\ked=${checkedParam}&id=${idParam}`;
        const fetchData = async () => {
            await fetch(API_PATH)
                .then(res => res.json())
                .then(
                    result => {
                        console.log(result.data.message);
                    },
                    error => {
                        throw error;
                    }
                )
        };
        fetchData().catch(err => console.log(err));

        setChecked({...checked, [nameParam]: checkedParam});
    };

    const handleChange = event => {
        const checkedParam = event.target.checked ? 1 : 0;
        const nameParam = event.target.name;

        setEvCheckedParam(checkedParam);
        setEvNameParam(nameParam);

        if (checkedParam) {
            updateData(checkedParam, nameParam);
        } else {
            handleDialogOpen();
        }
    };

    const handleDialogOpen = () => {
        setShowDialog(true);
    };

    const handleDialogClose = (change) => {
        setShowDialog(false);
    };

    useEffect(() => {
        const date = new Date();
        const pad = (number) => number < 10 ? '0' + number : number;
        const toSQLString = (date) => date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            ' ' + pad(date.getHours()) +
            '-' + pad(date.getMinutes()) +
            '-' + pad(date.getSeconds());
        const getMonthWeek = (date) => {
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
            return Math.ceil((date.getDate() + firstDay) / 7);
        };
        const today = toSQLString(date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const week = getMonthWeek(date);
        const weekday = date.getDay() === 0 ? 7 : date.getDay();
        const API_PATH = `http://localhost:3300/todo?today=${today}&year=${year}&month=${month}&day=${day}&week=${week}&weekday=${weekday}`;

        const fetchData = async () => {
            await fetch(API_PATH)
                .then(res => res.json())
                .then(
                    result => {
                        const {data} = result;
                        let checkedArr = {};
                        let textArr = {};

                        data.map((val, key) => {
                            checkedArr[`check${val.ID}`] = (val.Checked) === 1;
                            textArr[`check${val.ID}`] = val.Description;
                        });

                        setChecked(checkedArr);
                        setText(textArr);
                    },
                    error => {
                        throw error;
                    }
                )
        };

        fetchData().catch(err => console.log(err));
    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={10}>
                <Grid container>
                    <Grid xs={10}>
                         <h2 className={classes.titleH2}>To do list</h2>
                     </Grid>
                     <Grid xs={1}>
                         <Fab color="primary" aria-label="add" style={{backgroundColor: '#508FF4', marginTop: 13,}}>
                             <AddIcon/>
                         </Fab>
                    </Grid>
                 </Grid>
                <hr className={'hrGrey'}/>

                {Object.keys(checked).map((val, key) => {
                    const keyIndex = Object.keys(checked)[key];

                    return (
                        <FormGroup row className={classes.fromGroup} key={key}>
                            <FormControlLabel
                                control={<BlueCheckbox
                                    className={classes.checkbox}
                                    checked={checked[keyIndex]}
                                    onChange={handleChange}
                                    name={keyIndex}
                                    color="primary"
                                />}
                                label={
                                    !checked[keyIndex] ? text[keyIndex] : <s>{text[keyIndex]}</s>
                                }
                            />
                        </FormGroup>
                    );
                }, checked)}
            </Paper>

            <Dialog
                open={showDialog}
                onClose={handleDialogClose}
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
                    <Button onClick={() => handleDialogClose(0)} variant="contained"
                            style={{backgroundColor: '#ff4935', color: '#ffffff'}}>
                        No
                    </Button>
                    <Button onClick={() => {handleDialogClose(1); updateData(evCheckedParam, evNameParam)}} variant="contained"
                            style={{backgroundColor: '#35b93a', color: '#ffffff'}} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            
            <img src={planet} className={classes.photo} />
            
        </div>
    )
}

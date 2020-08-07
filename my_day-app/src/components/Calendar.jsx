import React, { useEffect, useState } from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DayCalendar from "./DayCalendar";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 80,
        width: 1100,
        borderRadius: 20,
        paddingBottom: 20,
        marginLeft: 20,
    },
    rowPaper: {
        display: "flex",
        flexWrap: "wrap",
    },
    currentMonthYear: {
        fontSize: 25,
    },
    calendarH2: {
        marginLeft: 20,
    },
}));

export default function Calendar() {
    const classes = useStyles();
    const [activities, setActivities] = useState([]); // array where key represents the day.
    const today = new Date();
    // const currentDay = today.getDay();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const daysOfSelectedMonth = []; // matrix 7x5
    const getNumberOfDaysInMonth = (year, month) =>
        32 - new Date(year, month, 32).getDate();
    const getFirstDayOfMonth = (year, month) => {
        let myDate = new Date(year, month).getDay();
        return myDate === 0 ? 6 : myDate - 1;
    };

    let positionToStart = getFirstDayOfMonth(currentYear, currentMonth);
    let maxNumberOfDays = getNumberOfDaysInMonth(currentYear, currentMonth);
    let dayIncrement = 1;

    for (let i = 0; i < 6; i++) {
        daysOfSelectedMonth[i] = new Array(7);
    }
    for (let j = 0; j < 7; j++) {
        // the first row can start at any position
        daysOfSelectedMonth[0][j] =
            j >= positionToStart ? dayIncrement++ : null;
    }
    for (let i = 1; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            daysOfSelectedMonth[i][j] =
                dayIncrement <= maxNumberOfDays ? dayIncrement++ : null;
        }
    }

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
        const userId = currentUser.ID;
        const API_PATH = `http://localhost:3300/calendar/getAll/2020-05-01/2020-06-01/${userId}`;
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
                        // TODO: remember to check if start date and end date are in the same day
                        let arr = [];

                        result.map((val, key) => {
                            const startDate = new Date(val.StartDate);
                            const dayStartDate = startDate.getDate();
                            if (arr[dayStartDate] === undefined) {
                                arr[dayStartDate] = [];
                            }
                            arr[dayStartDate].push(val);
                        });

                        setActivities(arr);
                    },
                    (error) => {
                        throw error;
                    }
                );
        };
        fetchData().catch((err) => console.log(err));
    }, []);

    let keyDayCalendar = 0; // TODO: change
    let keyDiv = 0; // TODO: change
    return (
        <Paper className={classes.root} elevation={10}>
            <div>
                <h2 className={classes.calendarH2} align={"left"}>
                    Calendar
                </h2>
                <hr className={"hrGrey"} />
                <h1 className={classes.currentMonthYear}>
                    {months[currentMonth] + " " + currentYear}
                </h1>
            </div>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {daysOfSelectedMonth.map((val, key) => {
                    return (
                        <div key={keyDiv++} className={classes.rowPaper}>
                            {val.map((val, key) => {
                                return (
                                    <DayCalendar
                                        key={keyDayCalendar++}
                                        activities={activities[val]}
                                        dayOfMonth={val}
                                        dayOfWeek={daysOfTheWeek[key]}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </Grid>
        </Paper>
    );
}

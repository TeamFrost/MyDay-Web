import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Today from "../img/today.png";

var objToday = new Date();
var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
const dayOfWeek = weekday[objToday.getDay()];
var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
const curMonth = months[objToday.getMonth()];
const mm = objToday.getMonth() + 1;
var dd = String(objToday.getDate()).padStart(2, '0');
const curYear = objToday.getFullYear();
const today = dayOfWeek + ', ' + dd + ' ' + curMonth + ' ' + curYear;


const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 400,
		width: 400,
		margin: 80,
		marginLeft: 20,
		borderRadius: 20,
		// maxHeight: 730
	},
	media: {
		height: 100,
		paddingTop: '56.25%',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: '#508FF4',
	},
	gridContainer: {
		display: 'grid',
		gridTemplateColumns: '15% auto auto auto 15%',
		width: '100%',
		alignItems: 'center',
		textAlign: 'center',
		verticalAlign: 'middle',
		marginBottom: 10,
	},
	thr: {
		color: 'gray',
		width: '50%',
	},
	description: {
		fontSize: 22,
	},
	line: {
		width: '100%',
		height: 5,
		borderRadius: 20,
		backgroundColor: '#508FF4',
		opacity: '0.8',
	}
}));



export default function RecipeReviewCard() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const [data, setData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const todayDate = curYear + '-' + mm + '-' + dd;

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
				`http://localhost:3300/dayoverview/getAllActivities/${todayDate}/${userId}`,
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


	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div style={{ display: 'block' }}>
			<Card className={classes.root} elevation={10}>
				<CardHeader

					title="Today"
					subheader={today}
				/>
				<hr className={"hrGrey"} />
				<CardMedia
					className={classes.media}
					image={Today}
				/>

				<CardContent>
					<Typography variant="h6" color="textSecondary" component="p">
						Today's events
        </Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
							<hr className={"hrGrey"} />
						{
							data ? data.map(el => <div><div className={classes.gridContainer}>
								<div className={classes.startDate}>
									{("0" + (parseInt(el.StartDate.slice(11, 13)) + 3)).slice(-2)}:{el.StartDate.slice(14, 16)}
									</div>
								<div className={classes.line}>
								</div>
								<div className={classes.description}>{el.Description}</div>
								<div className={classes.line}>
								</div>
								<div className={classes.endDate}>
								{("0" + (parseInt(el.EndDate.slice(11, 13)) + 3)).slice(-2)}:{el.EndDate.slice(14, 16)}
								</div>
							</div>
							<hr className={"hrGrey"} />
							</div>) : (<div><div className={classes.description}>There are no activities today.</div><hr className={"hrGrey"} /></div>)
						}
					</CardContent>
				</Collapse>
			</Card>
		</div>
	);
}
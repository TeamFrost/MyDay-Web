import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
<<<<<<< HEAD
import Tomorrow from "../img/tomorrow.png";
import { useState, useEffect } from "react";

var objToday = new Date();
var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
const dayOfWeek = weekday[objToday.getDay() + 1] ?? weekday[0];
var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
const curMonth = months[objToday.getMonth()];
const mm = objToday.getMonth() + 1;
var dd = String(objToday.getDate() + 1).padStart(2, '0');
const curYear = objToday.getFullYear();
const today = dayOfWeek + ', ' + dd + ' ' + curMonth + ' ' + curYear;

=======
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tomorrow from "../img/tomorrow.png";
>>>>>>> 76088c93f9ff42bcb77a86afd68ad14f852c97f0

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: 400,
    margin: 80,
    marginLeft: 20,
    borderRadius: 20,
<<<<<<< HEAD
   	// maxHeight: 730
=======
    maxHeight: 730
>>>>>>> 76088c93f9ff42bcb77a86afd68ad14f852c97f0
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
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
<<<<<<< HEAD
  },gridContainer: {
		display: 'grid',
		gridTemplateColumns: '15% auto auto auto 15%',
		width: '100%',
		alignItems: 'center',
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
	const tomorrowDate = curYear + '-' + mm + '-' + dd;

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
				`http://localhost:3300/dayoverview/getAllActivities/${tomorrowDate}/${userId}`,
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
=======
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
>>>>>>> 76088c93f9ff42bcb77a86afd68ad14f852c97f0

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ display: 'block' }}>
      <Card className={classes.root} elevation={10}>
<<<<<<< HEAD
        <CardHeader

          title="Tomorrow"
          subheader={today}
        />
        <hr className={"hrGrey"} />
        <CardMedia
          className={classes.media}
          image={Tomorrow}
        />
        <CardContent>
          <Typography variant="h6" color="textSecondary" component="p">
            Tomorrow's events
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
							</div>) : (<div><div className={classes.description}>There are no activities tomorrow.</div><hr className={"hrGrey"} /></div>)
						}
					</CardContent>
        </Collapse>
=======
      <CardHeader
        
        title="Tomorrow"
        subheader="September 15, 2020"
      />
      <hr className={"hrGrey"} />
      <CardMedia
        className={classes.media}
        image={Tomorrow}
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">
          Tomorrow's events
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
          <Typography paragraph>
            Event 1
          </Typography>
          <Typography paragraph>
            Event 2
          </Typography>
          <Typography paragraph>
            Event 3
          </Typography>
          <Typography>
            Event 4
          </Typography>
        </CardContent>
      </Collapse>
>>>>>>> 76088c93f9ff42bcb77a86afd68ad14f852c97f0
      </Card>
    </div>
  );
}
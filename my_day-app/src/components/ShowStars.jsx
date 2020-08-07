import React from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import GradeTwoToneIcon from "@material-ui/icons/GradeTwoTone";


const useStyles = makeStyles(theme => ({
	dayPaper: {
		width: 210,
		height: 160,
		marginTop: 80,
		marginLeft: 50,
		borderRadius: 20,
	},
	alignMid: {
		display: 'flex',
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		width: 'fit-content',
		margin: 'auto',
		fontSize: '24px',
	},
	margin: {
		margin: theme.spacing(1),
		borderRadius: 20,
	},
}));

const BorderLinearProgress = withStyles({
	root: {
		height: 10,
		backgroundColor: lighten('#ffb295', 0.625),
	},
	bar: {
		borderRadius: 20,
		backgroundColor: '#ffb295',
	},
})(LinearProgress);

export default function ShowStars() {
	const classes = useStyles();
	const curentUser = JSON.parse(localStorage.getItem("loggedUser"));
	const stars = curentUser.Stars;

	return (
		<Paper elevation={10} className={classes.dayPaper}>
			<Typography
				variant="h5"
				style={{ paddingTop: 16 }}
			>
				Stars
        	</Typography>
			<hr className={"hrGrey"} />
			<div className={classes.alignMid}>
				<GradeTwoToneIcon fontSize='large' style={{ color: "#ffb295" }} />
				{stars}
			</div>
			<div className={classes.alignMidCol}>
				<div style={{textAlign: 'left', marginLeft: 10}}>Next star:</div>
				<BorderLinearProgress
					className={classes.margin}
					variant="determinate"
					color="secondary"
					value={stars / 10}
				/>
			</div>
		</Paper>
	)
}

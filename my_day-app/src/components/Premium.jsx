import React from 'react';
<<<<<<< HEAD
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	cardHeader: {
		backgroundColor: '#508ff4'
	},
	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing(2),
	},
	paper: {
		width: 1200,
		height: 550,
		overflow: 'auto',
		textAlign: 'center',
		borderRadius: 20,
		margin: 80,
		marginLeft: 20,
		marginBottom: 5,
		marginRight: 5,
	},
}));

const tiers = [
	{
		title: 'Free',
		price: '0',
		description: ['Calendar included', 'Journal included', 'Up to 5 friends', 'Email support'],
		buttonText: 'You are here',
		buttonVariant: 'outlined',
	},
	{
		title: 'Pro',
		subheader: 'Most popular',
		price: '4.99',
		description: [
			'All the free features',
			'Statistics unlocked',
			'Up to 30 friends',
			'Priority email support',
		],
		buttonText: 'Get Pro',
		buttonVariant: 'contained',
	},
	{
		title: 'Ultra',
		price: '9.99',
		description: [
			'All the features',
			'Unlimited number of friends',
			'Help center access',
			'Phone & email support',
		],
		buttonText: 'Get Ultra',
		buttonVariant: 'contained',
	},
];

export default function Premium() {
	const classes = useStyles()
	return (
		<Paper className={classes.paper} elevation={10}>
			<React.Fragment>
				<Container maxWidth="md" component="main" style={{ marginTop: 80 }}>
					<Grid container spacing={5} alignItems="flex-end">
						{tiers.map((tier) => (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={tier.title} xs={12} sm={tier.title === 'Ultra' ? 12 : 6} md={4}>
								<Card>
									<CardHeader
										title={tier.title}
										subheader={tier.subheader}
										titleTypographyProps={{ align: 'center' }}
										subheaderTypographyProps={{ align: 'center' }}
										action={tier.title === 'Pro' ? <StarIcon /> : null}
										className={classes.cardHeader}
									/>
									<CardContent>
										<div className={classes.cardPricing}>
											<Typography component="h2" variant="h3" color="textPrimary">
												${tier.price}
											</Typography>
											<Typography variant="h6" color="textSecondary">
												/mo
                                </Typography>
										</div>
										<ul>
											{tier.description.map((line) => (
												<Typography component="li" variant="subtitle1" align="center" key={line}>
													{line}
												</Typography>
											))}
										</ul>
									</CardContent>
									<CardActions>
										<Button fullWidth variant={tier.buttonVariant} color="primary">
											{tier.buttonText}
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</React.Fragment>
		</Paper>
	);
}
=======
import {Paper, Grid} from '@material-ui/core';
import {makeStyles, withStyles} from "@material-ui/core/styles";

export default function Premium() {
    // const classes = useStyle();
     return (null)
}
>>>>>>> 76088c93f9ff42bcb77a86afd68ad14f852c97f0

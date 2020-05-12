import React from 'react';
import {Paper, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Default from '../img/default.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    height: 600,
    margin: 100,
    borderRadius: 20,
    paddingBottom: 20
},
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 20,
  },
}));

export default function Menu() {
  const classes = useStyles();

  return (
      <Paper className={classes.root} elevation={10}>
          <div>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="user" src={Default} className={classes.large} />
              </Grid>
              <Grid item xs alignItems='left'>
                <Typography>Nume</Typography>
              </Grid>
            </Grid>
            
            
          </div>
          <hr className={'hrGrey'}/>
          <div>

          </div>

          
      </Paper>
  );
}

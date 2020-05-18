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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tomorrow from "../img/tomorrow.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: 400,
    margin: 80,
    marginLeft: 20,
    borderRadius: 20,
    maxHeight: 730
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
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ display: 'block' }}>
      <Card className={classes.root} elevation={10}>
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
      </Card>
    </div>
  );
}
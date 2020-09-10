import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Container,
  Grid,
  Typography,
  Fab,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    position: 'relative',
  },
  leftBackground: {
    backgroundImage:
      "url('https://images.genius.com/19614278924f768db467c759ce261dae.960x960x1.jpg')",
    filter: 'blur(5px)',
    height: '100%',
    width: '50%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    transform: 'scale(1.02)',
  },
  rightBackground: {
    backgroundImage:
      "url('https://m.media-amazon.com/images/I/91aquOzXawL._SS500_.jpg')",
    filter: 'blur(5px)',
    height: '100%',
    width: '50%',
    position: 'fixed',
    top: 0,
    right: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    transform: 'scale(1.02)',
  },
  grid: {
    position: 'absolute',
    top: 0,
    padding: '50px',
    height: '100vh',
  },
  card: {
    margin: '50px',
    backgroundColor: 'grey',
  },
  cover: {
    padding: '20px',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  icon: {
    marginRight: '5px',
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftBackground} />
      <div className={classes.rightBackground} />
      <CssBaseline />
      <Grid
        container
        className={classes.grid}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={5}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.cover}
                component="img"
                alt="Contemplative Reptile"
                image="https://images.genius.com/19614278924f768db467c759ce261dae.960x960x1.jpg"
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.cover}
                component="img"
                alt="Contemplative Reptile"
                image="https://m.media-amazon.com/images/I/91aquOzXawL._SS500_.jpg"
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Fab color="secondary" variant="extended" className={classes.fab}>
        <EqualizerIcon className={classes.icon} />
        See Scores
      </Fab>
    </div>
  );
}

export default App;

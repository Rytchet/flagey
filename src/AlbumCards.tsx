import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, Grid } from '@material-ui/core';

import { Album } from './interfaces';

export default function AlbumCards({
  album1,
  album2,
  pick,
}: {
  album1: Album;
  album2: Album;
  pick: (winner: string, loser: string) => void;
}) {
  const useStyles = makeStyles({
    grid: {
      position: 'absolute',
      top: 0,
      padding: '50px',
      height: '100vh',
    },
    leftCard: {
      margin: '50px',
      backgroundColor: album1.accent,
    },
    rightCard: {
      margin: '50px',
      backgroundColor: album2.accent,
    },
    cover: {
      padding: '20px',
    },
  });

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.grid}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={5}>
        <Card className={classes.leftCard}>
          <CardActionArea onClick={() => pick(album1.name, album2.name)}>
            <CardMedia
              className={classes.cover}
              component="img"
              image={album1.cover}
              title={album1.elo.toString()}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={5}>
        <Card className={classes.rightCard}>
          <CardActionArea onClick={() => pick(album2.name, album1.name)}>
            <CardMedia
              className={classes.cover}
              component="img"
              image={album2.cover}
              title={album2.elo.toString()}
            />
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

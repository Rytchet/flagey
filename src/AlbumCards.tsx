import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      grid: {
        position: 'absolute',
        top: 0,
        padding: '50px',
        height: '100vh',
        maxHeight: '100vh',
        width: '100vw',
        [theme.breakpoints.down('sm')]: {
          marginTop: '-30px',
        },
      },
      leftCard: {
        backgroundColor: album1.accent,
        [theme.breakpoints.down('sm')]: {
          margin: '0px',
          height: '40vh',
          width: '40vh',
        },
        [theme.breakpoints.up('md')]: {
          margin: '50px',
        },
      },
      rightCard: {
        backgroundColor: album2.accent,
        [theme.breakpoints.down('sm')]: {
          margin: '0px',
          width: '40vh',
          height: '40vh',
        },
        [theme.breakpoints.up('md')]: {
          margin: '50px',
        },
      },
      cover: {
        [theme.breakpoints.down('sm')]: {
          padding: '10px',
        },
        [theme.breakpoints.up('md')]: {
          padding: '20px',
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.grid}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item md={6} lg={4}>
        <Card className={classes.leftCard}>
          <CardActionArea onClick={() => pick(album1.name, album2.name)}>
            <CardMedia
              className={classes.cover}
              component="img"
              image={album1.cover}
              title={album1.displayName}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item lg={2} />
      <Grid item md={6} lg={4}>
        <Card className={classes.rightCard}>
          <CardActionArea onClick={() => pick(album2.name, album1.name)}>
            <CardMedia
              className={classes.cover}
              component="img"
              image={album2.cover}
              title={album2.displayName}
            />
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

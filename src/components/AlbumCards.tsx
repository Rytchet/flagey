import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Card, CardActionArea, CardMedia, Grid } from '@material-ui/core';

import { Album } from '../interfaces';

export default function AlbumCards({
  albumPair,
  pick,
}: {
  albumPair: Album[];
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
        backgroundColor: albumPair[0].accent,
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
        backgroundColor: albumPair[1].accent,
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
          <CardActionArea
            onClick={() => pick(albumPair[0].name, albumPair[1].name)}
          >
            <CardMedia
              className={classes.cover}
              component="img"
              image={albumPair[0].cover}
              title={albumPair[0].displayName}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item lg={2} />
      <Grid item md={6} lg={4}>
        <Card className={classes.rightCard}>
          <CardActionArea
            onClick={() => pick(albumPair[1].name, albumPair[0].name)}
          >
            <CardMedia
              className={classes.cover}
              component="img"
              image={albumPair[1].cover}
              title={albumPair[1].displayName}
            />
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

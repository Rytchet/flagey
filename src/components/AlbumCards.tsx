import React, { useState, useEffect } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Card, CardActionArea, CardMedia, Grid } from '@material-ui/core';

import { Album } from '../interfaces';

interface CardData {
  cover: string | undefined;
  accent: string;
}

export default function AlbumCards({
  albumPair,
  pick,
}: {
  albumPair: Album[];
  pick: (winner: string, loser: string) => void;
}) {
  const [cardA, setCardA] = useState<CardData>({
    cover: albumPair[0].cover,
    accent: albumPair[0].accent,
  });
  const [cardB, setCardB] = useState<CardData>({
    cover: albumPair[1].cover,
    accent: albumPair[1].accent,
  });
  const [cardLoaderA, setCardLoaderA] = useState<CardData | undefined>(
    undefined
  );
  const [cardLoaderB, setCardLoaderB] = useState<CardData | undefined>(
    undefined
  );
  const [opacity, setOpacity] = useState(1);

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
      card: {
        opacity: opacity,
        transition: 'opacity 0.5s',
        [theme.breakpoints.down('sm')]: {
          margin: '0px',
          height: '40vh',
          width: '40vh',
        },
        [theme.breakpoints.up('md')]: {
          margin: '50px',
        },
      },
      cardA: {
        backgroundColor: cardA.accent,
      },
      cardB: {
        backgroundColor: cardB.accent,
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

  useEffect(() => {
    setCardLoaderA(undefined);
    setCardLoaderB(undefined);
    setOpacity(0);

    const imageLoaderA = new Image();
    const imageLoaderB = new Image();

    imageLoaderA.src = albumPair[0].cover;
    imageLoaderB.src = albumPair[1].cover;

    imageLoaderA.onload = () => {
      setCardLoaderA({
        cover: albumPair[0].cover,
        accent: albumPair[0].accent,
      });
    };
    imageLoaderB.onload = () => {
      setCardLoaderB({
        cover: albumPair[1].cover,
        accent: albumPair[1].accent,
      });
    };
  }, [albumPair]);

  useEffect(() => {
    if (!!cardLoaderA && !!cardLoaderB) {
      setCardA({ ...cardLoaderA });
      setCardB({ ...cardLoaderB });
      setOpacity(1);
    }
  }, [cardLoaderA, cardLoaderB]);

  return (
    <Grid
      container
      className={classes.grid}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item md={6} lg={4}>
        <Card className={[classes.card, classes.cardA].join(' ')}>
          <CardActionArea
            onClick={() => pick(albumPair[0].name, albumPair[1].name)}
          >
            <CardMedia
              className={classes.cover}
              component="img"
              image={cardA.cover}
              title={albumPair[0].displayName}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item lg={2} />
      <Grid item md={6} lg={4}>
        <Card className={[classes.card, classes.cardB].join(' ')}>
          <CardActionArea
            onClick={() => pick(albumPair[1].name, albumPair[0].name)}
          >
            <CardMedia
              className={classes.cover}
              component="img"
              image={cardB.cover}
              title={albumPair[1].displayName}
            />
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

import React, { useState, useEffect } from 'react';
import EloRank from 'elo-rank';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AlbumCards from './AlbumCards';
import Background from './Background';
import Ranking from './Ranking';
import Button from './Button';

import { Album } from './interfaces';
import albums from './albums';

const elo = new EloRank();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      position: 'relative',
      backgroundColor: 'black',
    },
  })
);

function getRandomAlbum() {
  let keys = Array.from(albums.keys());
  return albums.get(keys[Math.floor(Math.random() * keys.length)])!;
}

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [album1, setAlbum1] = useState({} as Album);
  const [album2, setAlbum2] = useState({} as Album);

  const setNewAlbums = () => {
    const oldAlbum1 = album1.name;
    const oldAlbum2 = album2.name;
    let newAlbum1;
    let newAlbum2;

    do {
      newAlbum1 = getRandomAlbum();
      newAlbum2 = getRandomAlbum();
    } while (
      newAlbum1.name === oldAlbum1 ||
      newAlbum1.name === oldAlbum2 ||
      newAlbum2.name === oldAlbum1 ||
      newAlbum2.name === oldAlbum2 ||
      newAlbum1.name === newAlbum2.name
    );

    setAlbum1(newAlbum1);
    setAlbum2(newAlbum2);
  };

  const pick = (winner: string, loser: string) => {
    let win = albums.get(winner)!;
    let lose = albums.get(loser)!;

    const expectedA = elo.getExpected(win.elo, lose.elo);
    const expectedB = elo.getExpected(lose.elo, win.elo);

    win.elo = elo.updateRating(expectedA, 1, win.elo);
    lose.elo = elo.updateRating(expectedB, 0, lose.elo);

    setNewAlbums();
  };

  useEffect(() => {
    setNewAlbums();
    setLoaded(true);
    // This line gives an error about a missing dependency, but it's ok to ignore
    // eslint-disable-next-line
  }, []);

  if (!loaded) {
    return <> </>;
  }

  return (
    <div className={classes.root}>
      <Background album1={album1} album2={album2} />
      <CssBaseline />
      <AlbumCards album1={album1} album2={album2} pick={pick} />

      <Button setOpen={setOpen} />

      <Ranking setOpen={setOpen} open={open} albums={albums} />
    </div>
  );
}

export default App;

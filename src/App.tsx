import React, { useState, useEffect } from 'react';
import EloRank from 'elo-rank';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  AlbumCards,
  Background,
  Ranking,
  Buttons,
  EndSnackbar,
} from './components';
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

const getRandomAlbum = () => {
  let keys = Array.from(albums.keys());
  return albums.get(keys[Math.floor(Math.random() * keys.length)])!;
};

const totalMatches = () => {
  return (albums.size * (albums.size - 1)) / 2;
};

function App() {
  const classes = useStyles();
  const [rankingOpen, setRankingOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);
  const [matched, setMatched] = useState([] as string[][]);
  const [album1, setAlbum1] = useState({} as Album);
  const [album2, setAlbum2] = useState({} as Album);

  const setNewAlbums = () => {
    let newAlbum1: Album;
    let newAlbum2: Album;

    do {
      newAlbum1 = getRandomAlbum();
      newAlbum2 = getRandomAlbum();
    } while (
      matched.some(
        // References to these variables are intended, so we can mute a warning
        // eslint-disable-next-line
        (match) =>
          match.includes(newAlbum1.name) && match.includes(newAlbum2.name)
      ) ||
      newAlbum1.name === newAlbum2.name
    );

    console.log('setting');

    setMatched((matched) => [...matched, [newAlbum1.name, newAlbum2.name]]);

    setAlbum1(newAlbum1);
    setAlbum2(newAlbum2);
  };

  const pick = (winner: string, loser: string) => {
    if (finished) return;

    let win = albums.get(winner)!;
    let lose = albums.get(loser)!;

    const expectedA = elo.getExpected(win.elo, lose.elo);
    const expectedB = elo.getExpected(lose.elo, win.elo);

    win.elo = elo.updateRating(expectedA, 1, win.elo);
    lose.elo = elo.updateRating(expectedB, 0, lose.elo);

    if (matched.length < totalMatches()) {
      setNewAlbums();
    } else {
      // Update matched list so the number is accurate
      setMatched((matched) => [...matched, []]);
      setFinished(true);
      setRankingOpen(true);
      setSnackbarOpen(true);
    }
  };

  const restart = async () => {
    window.location.reload();
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

      <Buttons
        setOpen={setRankingOpen}
        matches={matched.length - 1}
        total={totalMatches()}
      />

      <Ranking setOpen={setRankingOpen} open={rankingOpen} albums={albums} />

      <EndSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        restart={restart}
      />
    </div>
  );
}

export default App;

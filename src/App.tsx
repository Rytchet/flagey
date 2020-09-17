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

const pairSet: Set<[string, string]> = new Set();
const albumNames = Array.from(albums.keys());
for (let i = 0; i < albumNames.length; i++) {
  for (let j = i + 1; j < albumNames.length; j++) {
    pairSet.add([albumNames[i], albumNames[j]]);
  }
}

const getRandomPair = () => {
  const pairList = Array.from(pairSet);
  const randomPair = pairList[Math.floor(Math.random() * pairList.length)];
  pairSet.delete(randomPair);
  const album1 = albums.get(randomPair[0])!;
  const album2 = albums.get(randomPair[1])!;
  return [album1, album2];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      position: 'relative',
      backgroundColor: 'black',
    },
  })
);

function App() {
  const classes = useStyles();
  const [rankingOpen, setRankingOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);
  const [album1, setAlbum1] = useState({} as Album);
  const [album2, setAlbum2] = useState({} as Album);

  const totalMatches = (albums.size * (albums.size - 1)) / 2;

  const setNewAlbums = () => {
    const [newAlbum1, newAlbum2] = getRandomPair();

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

    if (pairSet.size > 0) {
      setNewAlbums();
    } else {
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
        matches={totalMatches - pairSet.size - 1}
        total={totalMatches}
        finished={finished}
      />

      <Ranking setOpen={setRankingOpen} open={rankingOpen} albums={albums} />

      <EndSnackbar open={snackbarOpen} restart={restart} />
    </div>
  );
}

export default App;

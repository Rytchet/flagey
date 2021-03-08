import React, { useState, useEffect } from 'react';
import EloRank from 'elo-rank';

import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  AlbumCards,
  Background,
  Buttons,
  EndSnackbar,
  Help,
  Ranking,
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
  const [helpOpen, setHelpOpen] = useState(false);
  const [endSnackbarOpen, setEndSnackbarOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);
  const [albumPair, setAlbumPair] = useState([] as Album[]);

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  const totalMatches = (albums.size * (albums.size - 1)) / 2;

  const setNewAlbums = () => {
    setAlbumPair(getRandomPair());
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
      setEndSnackbarOpen(true);
    }
  };

  const restart = async () => {
    window.location.reload();
  };

  useEffect(() => {
    // Preload all images
    albums.forEach((album) => {
      const img = new Image();
      img.src = album.cover;
      if (album.titleCover) img.src = album.titleCover;
    });

    setNewAlbums();
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <> </>;
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Background albumPair={albumPair} />

        <AlbumCards albumPair={albumPair} pick={pick} />

        <Buttons
          setRankingOpen={setRankingOpen}
          setHelpOpen={setHelpOpen}
          matches={totalMatches - pairSet.size - 1}
          total={totalMatches}
          finished={finished}
        />

        <Help setOpen={setHelpOpen} open={helpOpen} />

        <Ranking setOpen={setRankingOpen} open={rankingOpen} albums={albums} />

        <EndSnackbar open={endSnackbarOpen} restart={restart} />
      </ThemeProvider>
    </div>
  );
}

export default App;

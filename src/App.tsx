import React, { useState, useEffect } from 'react';
import EloRank from 'elo-rank';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Fab, Dialog } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import AlbumCards from './AlbumCards';
import Background from './Background';
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
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    icon: {
      marginRight: '5px',
    },
    table: {
      minWidth: '500px',
      paddingBottom: '30px',
      [theme.breakpoints.down('sm')]: {
        minWidth: '82vw',
      },
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
  const [displayTitles, setDisplayTitles] = useState(false);
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
  }, []);

  if (!loaded) {
    return <> </>;
  }

  return (
    <div className={classes.root}>
      <Background album1={album1} album2={album2} />
      <CssBaseline />
      <AlbumCards album1={album1} album2={album2} pick={pick} />

      <Fab
        color="secondary"
        variant="extended"
        className={classes.fab}
        onClick={() => setOpen(true)}
      >
        <EqualizerIcon className={classes.icon} />
        Zobacz ranking
      </Fab>

      <Dialog onClose={() => setOpen(false)} open={open}>
        <Table
          className={classes.table}
          onClick={() => setDisplayTitles(!displayTitles)}
          style={{
            cursor: 'pointer',
          }}
        >
          <TableBody>
            {Array.from(albums.values())
              .sort((a1, a2) => (a1.elo > a2.elo ? -1 : 1))
              .map((album) => (
                <TableRow
                  key={album.name}
                  style={{
                    backgroundImage: `url(${
                      album.titleCover ? album.titleCover : album.cover
                    })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: `50% ${
                      displayTitles ? album.titlePosition : album.coverPosition
                    }`,
                    transition: 'background-position 1s',
                    height: '80px',
                  }}
                >
                  <TableCell
                    align="left"
                    style={{
                      border: '0',
                    }}
                  ></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Dialog>
    </div>
  );
}

export default App;

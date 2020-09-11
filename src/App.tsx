import React, { useState, useEffect } from 'react';
import EloRank from 'elo-rank';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Fab, Dialog, DialogTitle } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AlbumCards from './AlbumCards';
import Background from './Background';
import { Album } from './interfaces';

const elo = new EloRank();

let albums: Map<string, Album> = new Map([
  [
    'trojkat',
    {
      name: 'trojkat',
      displayName: 'Trójkąt',
      elo: 1200,
      cover:
        'https://asfaltshop.pl/uploads/photos/20150719084549_taco_hemingway_trojkat_warszawski.jpg',
      accent: '#C85424',
      coverPosition: '32%',
    },
  ],
  [
    'umowa',
    {
      name: 'umowa',
      displayName: 'Umowa o Dzieło',
      elo: 1200,
      cover:
        'https://images.genius.com/8a72cb9d34e318ad1bc82e5bad525d3d.960x960x1.jpg',
      accent: '#211926',
      coverPosition: '39%',
    },
  ],
  [
    'wosk',
    {
      name: 'wosk',
      displayName: 'Wosk',
      elo: 1200,
      cover:
        'https://images.genius.com/3ade4ed194a081f48b47f8d0c95637ce.1000x1000x1.jpg',
      accent: '#AE4278',
      coverPosition: '50%',
    },
  ],
  [
    'szprycer',
    {
      name: 'szprycer',
      displayName: 'Szprycer',
      elo: 1200,
      cover:
        'https://scontent-lhr8-1.xx.fbcdn.net/v/t31.0-8/p960x960/20506958_10154549326931386_8907009044243503624_o.jpg?_nc_cat=107&_nc_sid=7aed08&_nc_ohc=KnBgzkFqG2gAX-G_L9Z&_nc_ht=scontent-lhr8-1.xx&tp=6&oh=c243de8e7bd86dbf732bfa276c32e674&oe=5F813E53',
      accent: '#F6E3DF',
      coverPosition: '34%',
    },
  ],
  [
    'soma',
    {
      name: 'soma',
      displayName: 'Soma 0,5 mg',
      elo: 1200,
      cover:
        'https://images.genius.com/9752f6381ba9850fd3b53ed274cc926d.1000x1000x1.jpg',
      accent: '#D26381',
      coverPosition: '59%',
    },
  ],
  [
    '025',
    {
      name: '025',
      displayName: '0,25 mg',
      elo: 1200,
      cover: 'https://i1.sndcdn.com/artworks-000334254384-66yffi-t500x500.jpg',
      accent: '#CA5067',
      coverPosition: '30%',
    },
  ],
  [
    'belga',
    {
      name: 'belga',
      displayName: 'Café Belga',
      elo: 1200,
      cover:
        'https://i.genius.com/60995df0d1a2b0cddda998721a51fa8dd296b28f?url=https%3A%2F%2Fi.scdn.co%2Fimage%2F4429f12ca469526557cb4a59104848033af7ac6b',
      accent: '#59B3AC',
      coverPosition: '43%',
    },
  ],
  [
    'flagey',
    {
      name: 'flagey',
      displayName: 'Flagey',
      elo: 1200,
      cover:
        'https://e.snmc.io/i/600/w/7c3aabaadcfa8924d96b65500d840fbc/7078483',
      accent: '#fcfbfe',
      coverPosition: '20%',
    },
  ],
  [
    'pocztowka',
    {
      name: 'pocztowka',
      displayName: 'Pocztówka z WWA',
      elo: 1200,
      cover:
        'https://images.genius.com/685795d1ab440ba7a5afbfac3725cabc.1000x1000x1.jpg',
      accent: '#83AEB9',
      coverPosition: '46%',
    },
  ],
  [
    'jarmark',
    {
      name: 'jarmark',
      displayName: 'Jarmark',
      elo: 1200,
      cover: 'https://rytmy.pl/wp-content/uploads/2020/08/taco-1-1024x1024.jpg',
      accent: '#f0be43',
      coverPosition: '46%',
    },
  ],
  [
    'europa',
    {
      name: 'europa',
      displayName: 'Europa',
      elo: 1200,
      cover:
        'https://scontent-lht6-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/116346268_284120196189164_4528345587490180771_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_cat=108&_nc_ohc=jLwVIVcrSQoAX_upSFm&oh=2242ae09ffa80fe7166b585f1e043a5a&oe=5F856FD5',
      accent: '#fde9cf',
      coverPosition: '37%',
    },
  ],
]);

const useStyles = makeStyles({
  root: {
    height: '100vh',
    position: 'relative',
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
  },
  text: {
    color: 'white',
    fontWeight: 900,
    fontSize: '2rem',
    textTransform: 'uppercase',
  },
});

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

      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Table className={classes.table}>
          <TableBody>
            {Array.from(albums.values())
              .sort((a1, a2) => (a1.elo > a2.elo ? -1 : 1))
              .map((album, idx) => (
                <TableRow
                  key={album.name}
                  style={{
                    backgroundImage: `url(${album.cover})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: `50% ${album.coverPosition}`,
                  }}
                >
                  <TableCell className={classes.text} align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell
                    className={classes.text}
                    align="left"
                    style={{ color: `${album.accent}` }}
                  >
                    {album.displayName} {album.elo}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Dialog>
    </div>
  );
}

export default App;

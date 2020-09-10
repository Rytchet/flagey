import React, { useState } from 'react';
import EloRank from 'elo-rank';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Fab } from '@material-ui/core';

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
    },
  ],
  [
    'umowa',
    {
      name: 'umowa',
      displayName: 'Umowa o Dzieło',
      elo: 1200,
      cover:
        'https://img.discogs.com/5CKRz6knYc6D31xaprBsIas989U=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7387685-1440419942-1281.jpeg.jpg',
      accent: '#211926',
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
    },
  ],
  [
    'europa',
    {
      name: 'europa',
      displayName: 'Europa',
      elo: 1200,
      cover:
        'https://t2.genius.com/unsafe/276x276/https%3A%2F%2Fimages.genius.com%2F4418ef92fd026f741a651d2becf68eb8.1000x1000x1.jpg',
      accent: '#fde9cf',
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
});

function getRandomAlbum() {
  let keys = Array.from(albums.keys());
  return albums.get(keys[Math.floor(Math.random() * keys.length)])!;
}

function App() {
  const classes = useStyles();
  const [album1, setAlbum1] = useState(getRandomAlbum());
  const [album2, setAlbum2] = useState(getRandomAlbum());

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

  return (
    <div className={classes.root}>
      <Background album1={album1} album2={album2} />
      <CssBaseline />
      <AlbumCards album1={album1} album2={album2} pick={pick} />

      <Fab color="secondary" variant="extended" className={classes.fab}>
        <EqualizerIcon className={classes.icon} />
        Zobacz ranking
      </Fab>
    </div>
  );
}

export default App;

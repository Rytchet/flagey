import { Album } from './interfaces';

import * as covers from './covers';

const albums: Map<string, Album> = new Map([
  [
    'trojkat',
    {
      name: 'trojkat',
      displayName: 'Trójkąt',
      elo: 1200,
      cover: covers.trojkat,
      titleCover: covers.trojkatTitle,
      accent: '#C85424',
      coverPosition: '45%',
      titlePosition: '10%',
    },
  ],
  [
    'umowa',
    {
      name: 'umowa',
      displayName: 'Umowa o Dzieło',
      elo: 1200,
      cover: covers.umowa,
      accent: '#211926',
      coverPosition: '39%',
      titlePosition: '10%',
    },
  ],
  [
    'wosk',
    {
      name: 'wosk',
      displayName: 'Wosk',
      elo: 1200,
      cover: covers.wosk,
      accent: '#AE4278',
      coverPosition: '53%',
      titlePosition: '10%',
    },
  ],
  [
    'marmur',
    {
      name: 'marmur',
      displayName: 'Marmur',
      elo: 1200,
      cover: covers.marmur,
      accent: '#f1f0e9',
      coverPosition: '85%',
      titlePosition: '52%',
    },
  ],
  [
    'szprycer',
    {
      name: 'szprycer',
      displayName: 'Szprycer',
      elo: 1200,
      cover: covers.szprycer,
      accent: '#F6E3DF',
      coverPosition: '32%',
      titlePosition: '7%',
    },
  ],
  [
    'soma',
    {
      name: 'soma',
      displayName: 'Soma 0,5 mg',
      elo: 1200,
      cover: covers.soma,
      titleCover: covers.somaTitle,
      accent: '#D26381',
      coverPosition: '58%',
      titlePosition: '3%',
    },
  ],
  [
    'soma025',
    {
      name: 'soma025',
      displayName: '0,25 mg',
      elo: 1200,
      cover: covers.soma025,
      titleCover: covers.soma025Title,
      accent: '#CA5067',
      coverPosition: '28%',
      titlePosition: '99%',
    },
  ],
  [
    'belga',
    {
      name: 'belga',
      displayName: 'Café Belga',
      elo: 1200,
      cover: covers.belga,
      accent: '#59B3AC',
      coverPosition: '44%',
      titlePosition: '12%',
    },
  ],
  [
    'flagey',
    {
      name: 'flagey',
      displayName: 'Flagey',
      elo: 1200,
      cover: covers.flagey,
      titleCover: covers.flageyTitle,
      accent: '#fcfbfe',
      coverPosition: '75%',
      titlePosition: '50%',
    },
  ],
  [
    'pocztowka',
    {
      name: 'pocztowka',
      displayName: 'Pocztówka z WWA',
      elo: 1200,
      cover: covers.pocztowka,
      titleCover: covers.pocztowkaTitle,
      accent: '#83AEB9',
      coverPosition: '46%',
      titlePosition: '96%',
    },
  ],
  [
    'jarmark',
    {
      name: 'jarmark',
      displayName: 'Jarmark',
      elo: 1200,
      cover: covers.jarmark,
      accent: '#f0be43',
      coverPosition: '44%',
      titlePosition: '8%',
    },
  ],
  [
    'europa',
    {
      name: 'europa',
      displayName: 'Europa',
      elo: 1200,
      cover: covers.europa,
      accent: '#fde9cf',
      coverPosition: '40%',
      titlePosition: '8%',
    },
  ],
]);

export default albums;

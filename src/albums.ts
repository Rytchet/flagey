import { Album } from './interfaces';

const albums: Map<string, Album> = new Map([
  [
    'trojkat',
    {
      name: 'trojkat',
      displayName: 'Trójkąt',
      elo: 1200,
      cover:
        'https://asfaltshop.pl/uploads/photos/20150719084549_taco_hemingway_trojkat_warszawski.jpg',
      titleCover:
        'https://images.genius.com/a38dccc1f190a1e509bccf25ceb461be.960x959x1.jpg',
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
      cover:
        'https://images.genius.com/8a72cb9d34e318ad1bc82e5bad525d3d.960x960x1.jpg',
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
      cover:
        'https://images.genius.com/3ade4ed194a081f48b47f8d0c95637ce.1000x1000x1.jpg',
      accent: '#AE4278',
      coverPosition: '53%',
      titlePosition: '10%',
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
      cover:
        'https://images.genius.com/9752f6381ba9850fd3b53ed274cc926d.1000x1000x1.jpg',
      titleCover:
        'https://a.allegroimg.com/original/1133c0/a945b1034784ab043f5b66bf6b53/TACONAFIDE-SOMA-0-5-MG-CD-TACO-QUEBONAFIDE',
      accent: '#D26381',
      coverPosition: '58%',
      titlePosition: '3%',
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
      coverPosition: '28%',
      titlePosition: '28%',
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
      cover:
        'https://e.snmc.io/i/600/w/7c3aabaadcfa8924d96b65500d840fbc/7078483',
      accent: '#fcfbfe',
      coverPosition: '75%',
      titlePosition: '54.5%',
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
      titleCover:
        'https://lh3.googleusercontent.com/proxy/aXkqmEH4si_O5UCJjCD8EhtGbsHy6LigfV6gMKy4qOIq9_J_UFHK2mvX6DRXVaux7nmpXWO01CR_8twTev1E8z5KsKDM-fHcaBWGVy54rPwM6X6DjY56IvgUiuv9dm3Ft72ufwJuDyAQMQopcAUadinRHpgB3yBPr41BiEU40cXLi4PQH-yG_1A59iHSldRqXzjkOWWEfNsrVWaIKgBbLiwcklJ_hHPhYRPyl2V8aNP7wDAo1UoP8lYkPOFEyWQmyq_eSOvyOeEV',
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
      cover: 'https://rytmy.pl/wp-content/uploads/2020/08/taco-1-1024x1024.jpg',
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
      cover:
        'https://scontent-lht6-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/116346268_284120196189164_4528345587490180771_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_cat=108&_nc_ohc=jLwVIVcrSQoAX_upSFm&oh=2242ae09ffa80fe7166b585f1e043a5a&oe=5F856FD5',
      accent: '#fde9cf',
      coverPosition: '40%',
      titlePosition: '8%',
    },
  ],
]);

export default albums;

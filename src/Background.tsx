import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Album } from './interfaces';

export default function Background({
  album1,
  album2,
}: {
  album1: Album;
  album2: Album;
}) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      leftBackground: {
        backgroundImage: `url('${album1.cover}')`,
        filter: 'blur(5px)',
        height: '100%',
        width: '50%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transform: 'scale(1.02, 1.05)',
        [theme.breakpoints.down('sm')]: {
          height: '50%',
          width: '100%',
          transform: 'scale(1.05, 1.0)',
        },
      },
      rightBackground: {
        backgroundImage: `url('${album2.cover}')`,
        filter: 'blur(5px)',
        height: '100%',
        width: '50%',
        position: 'fixed',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transform: 'scale(1.015, 1.05)',
        [theme.breakpoints.up('md')]: {
          top: 0,
          right: 0,
        },
        [theme.breakpoints.down('sm')]: {
          height: '52%',
          width: '100%',
          bottom: 0,
          transform: 'scale(1.05, 1.02)',
        },
      },
    })
  );
  const classes = useStyles();
  return (
    <div>
      <div className={classes.leftBackground} />
      <div className={classes.rightBackground} />
    </div>
  );
}

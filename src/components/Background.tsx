import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Album } from '../interfaces';

export default function Background({ albumPair }: { albumPair: Album[] }) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      leftBackground: {
        backgroundImage: `url('${albumPair[0].cover}')`,
        filter: 'blur(5px)',
        height: '100%',
        width: '50%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        transform: 'scale(1.02, 1.05)',
        transition: 'background-image 0.2s',
        [theme.breakpoints.down('sm')]: {
          height: '50%',
          width: '100%',
          transform: 'scale(1.05, 1.0)',
        },
      },
      rightBackground: {
        backgroundImage: `url('${albumPair[1].cover}')`,
        filter: 'blur(5px)',
        height: '100%',
        width: '50%',
        position: 'fixed',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        transform: 'scale(1.015, 1.05)',
        transition: 'background-image 0.5s',
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

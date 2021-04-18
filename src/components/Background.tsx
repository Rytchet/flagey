import React, { useState, useEffect } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Album } from '../interfaces';

type Cover = string | undefined;

export default function Background({ albumPair }: { albumPair: Album[] }) {
  const [coverA, setCoverA] = useState<Cover>(undefined);
  const [coverB, setCoverB] = useState<Cover>(undefined);
  const [coverLoaderA, setCoverLoaderA] = useState<Cover>(undefined);
  const [coverLoaderB, setCoverLoaderB] = useState<Cover>(undefined);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      background: {
        filter: 'blur(5px)',
        height: '100%',
        width: '50%',
        position: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundColor: 'white',
        transition: 'background-image 0.5s',
      },
      backgroundA: {
        top: 0,
        left: 0,
        transform: 'scale(1.02, 1.05)',
        [theme.breakpoints.down('sm')]: {
          height: '50%',
          width: '100%',
          transform: 'scale(1.05, 1.0)',
        },
        backgroundImage: `url(${coverA})`,
      },
      backgroundB: {
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
        backgroundImage: `url(${coverB})`,
      },
    })
  );

  const classes = useStyles();

  useEffect(() => {
    setCoverLoaderA(undefined);
    setCoverLoaderB(undefined);

    const imageLoaderA = new Image();
    const imageLoaderB = new Image();

    imageLoaderA.src = albumPair[0].cover;
    imageLoaderB.src = albumPair[1].cover;

    imageLoaderA.onload = () => {
      setCoverLoaderA(albumPair[0].cover);
    };
    imageLoaderB.onload = () => {
      setCoverLoaderB(albumPair[1].cover);
    };
  }, [albumPair]);

  useEffect(() => {
    if (!!coverLoaderA && !!coverLoaderB) {
      setCoverA(coverLoaderA);
      setCoverB(coverLoaderB);
    }
  }, [coverLoaderA, coverLoaderB]);

  return (
    <div>
      <div className={[classes.background, classes.backgroundA].join(' ')} />
      <div className={[classes.background, classes.backgroundB].join(' ')} />
    </div>
  );
}

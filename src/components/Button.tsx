import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Fab } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    icon: {
      marginRight: '5px',
    },
  })
);

type ButtonProps = {
  setOpen: (state: boolean) => void;
};

export default function Button({ setOpen }: ButtonProps) {
  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      variant="extended"
      className={classes.fab}
      onClick={() => setOpen(true)}
    >
      <EqualizerIcon className={classes.icon} />
      Zobacz ranking
    </Fab>
  );
}

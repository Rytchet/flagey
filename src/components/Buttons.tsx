import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Fab, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    counterFab: {
      marginRight: 8,
      width: '80px',
      cursor: 'default',
    },
    icon: {
      marginRight: '5px',
    },
  })
);

type ButtonsProps = {
  setOpen: (state: boolean) => void;
  matches: number;
  total: number;
};

export default function Buttons({ setOpen, matches, total }: ButtonsProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Tooltip title="Make all picks for an accurate result">
        <Fab
          className={classes.counterFab}
          style={{
            backgroundColor: '#1d1d1d',
            color: '#e0e0e0',
          }}
          disableRipple
          variant="extended"
        >
          {matches} / {total}
        </Fab>
      </Tooltip>
      <Fab color="secondary" variant="extended" onClick={() => setOpen(true)}>
        <EqualizerIcon className={classes.icon} />
        See ranking
      </Fab>
    </div>
  );
}

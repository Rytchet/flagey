import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Equalizer as EqualizerIcon,
  HelpOutline as HelpIcon,
} from '@material-ui/icons';
import { Fab, Grid, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    counterFab: {
      cursor: 'default',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

type ButtonsProps = {
  setRankingOpen: (state: boolean) => void;
  setHelpOpen: (state: boolean) => void;
  matches: number;
  total: number;
  finished: boolean;
};

export default function Buttons({
  setRankingOpen,
  setHelpOpen,
  matches,
  total,
  finished,
}: ButtonsProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item>
          <Fab disableRipple size="medium" onClick={() => setHelpOpen(true)}>
            <HelpIcon />
          </Fab>
        </Grid>

        <Grid item>
          <Tooltip title="Make all picks for an accurate result">
            <Fab
              className={classes.counterFab}
              disableRipple
              variant="extended"
            >
              {finished ? 'DONE' : `${matches} / ${total}`}
            </Fab>
          </Tooltip>
        </Grid>

        <Grid item>
          <Fab
            color="secondary"
            variant="extended"
            onClick={() => setRankingOpen(true)}
          >
            <EqualizerIcon className={classes.icon} />
            See ranking
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}

import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon, GitHub as GitHubIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

type HelpProps = {
  setOpen: (state: boolean) => void;
  open: boolean;
};

export default function Help({ setOpen, open }: HelpProps) {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography variant="h6">Help</Typography>

        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Use this website to create a ranking of albums by{' '}
          <Link
            href="https://en.wikipedia.org/wiki/Taco_Hemingway"
            target="_blank"
            rel="noreferrer"
            color="inherit"
            underline="always"
          >
            Taco Hemingway
          </Link>
          . It uses the Elo system to dynamically generate a ranking of the
          albums.
        </Typography>
        <Typography gutterBottom>
          Click on the album you like more. The more picks you make, the more
          accurate the ranking will be.
        </Typography>
        <Typography gutterBottom>
          On ranking view, click on the list to switch between cover and title
          view.
        </Typography>
      </DialogContent>
      <DialogActions>
        <a
          href="https://github.com/Rytchet/flagey"
          target="_blank"
          rel="noreferrer"
        >
          <Button startIcon={<GitHubIcon />}>Github</Button>
        </a>
      </DialogActions>
    </Dialog>
  );
}

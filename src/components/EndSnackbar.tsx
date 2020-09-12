import React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type EndSnackbarProps = {
  open: boolean;
  setOpen: (status: boolean) => void;
  restart: () => void;
};

export default function SimpleSnackbar({
  open,
  setOpen,
  restart,
}: EndSnackbarProps) {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        message="You finished picking"
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                restart();
              }}
            >
              Try again?
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}

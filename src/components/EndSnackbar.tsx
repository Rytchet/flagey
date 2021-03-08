import React from 'react';

import { Button, Snackbar } from '@material-ui/core';

type EndSnackbarProps = {
  open: boolean;
  restart: () => void;
};

export default function EndSnackbar({ open, restart }: EndSnackbarProps) {
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

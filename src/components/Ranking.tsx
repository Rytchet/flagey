import React, { useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import {
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

import { Album } from '../interfaces';
import { useUtilStyles } from '../utils';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    '& div': {
      overflowX: 'hidden',
    },
  },
  table: {
    minWidth: '500px',
    paddingBottom: '30px',
    backgroundColor: 'black',
    cursor: 'pointer',
    overflowX: 'hidden',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
  },
  tableRow: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    transition: 'background-position 1s',
    height: '80px',
  },
}));

type RankingProps = {
  setOpen: (state: boolean) => void;
  open: boolean;
  albums: Map<string, Album>;
};

export default function Ranking({ setOpen, open, albums }: RankingProps) {
  const classes = useStyles();
  const utilClasses = useUtilStyles();
  const [displayTitles, setDisplayTitles] = useState(true);

  return (
    <Dialog
      className={classes.dialog}
      onClose={() => setOpen(false)}
      open={open}
      scroll="body"
    >
      <Table
        className={classes.table}
        onClick={() => setDisplayTitles(!displayTitles)}
      >
        <TableBody>
          {Array.from(albums.values())
            .sort((a1, a2) => (a1.elo > a2.elo ? -1 : 1))
            .map((album, index) => (
              <TableRow
                key={album.name}
                className={classes.tableRow}
                style={{
                  backgroundImage: `url(${
                    album.titleCover ? album.titleCover : album.cover
                  })`,
                  backgroundPosition: `50% ${
                    displayTitles ? album.titlePosition : album.coverPosition
                  }`,
                }}
              >
                <TableCell
                  style={{
                    border: '0',
                  }}
                >
                  <span className={utilClasses.srOnly}>
                    #{index + 1}: {album.displayName}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}

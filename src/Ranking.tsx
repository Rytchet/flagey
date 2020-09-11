import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Dialog } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { Album } from './interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: '500px',
      paddingBottom: '30px',
      backgroundColor: 'black',
      [theme.breakpoints.down('sm')]: {
        minWidth: '82vw',
      },
    },
    tableRow: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      transition: 'background-position 1s',
      height: '80px',
    },
  })
);

type RankingProps = {
  setOpen: (state: boolean) => void;
  open: boolean;
  albums: Map<string, Album>;
};

export default function Ranking({ setOpen, open, albums }: RankingProps) {
  const classes = useStyles();
  const [displayTitles, setDisplayTitles] = useState(false);

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <Table
        className={classes.table}
        onClick={() => setDisplayTitles(!displayTitles)}
        style={{
          cursor: 'pointer',
        }}
      >
        <TableBody>
          {Array.from(albums.values())
            .sort((a1, a2) => (a1.elo > a2.elo ? -1 : 1))
            .map((album) => (
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
                />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    makeStyles
} from "@material-ui/core"

const useStyles=makeStyles((theme)=>({
  root:{
    backgroundColor:theme.palette.primary.dark,
    overflow:"auto",
    color:"#fff",
    "& .MuiTableContainer-root":{
      maxHeight:"70%",
    },
    "& .MuiTableCell-body":{
      color:"rgba(255,255,255,50%)"
    },
    "& .MuiTableCell-root":{
      padding:"14px",
      borderBottom:0
    },
    "& .MuiTableCell-stickyHeader":{
      backgroundColor:theme.palette.primary.dark,
      color:"rgba(255,255,255,50%)"
    },
  },
  pagination:{
    "& .MuiTablePagination-toolbar":{
      backgroundColor:theme.palette.primary.dark,
      color:"rgba(255,255,255,50%)"
    },
    "& .MuiIconButton-root.Mui-disabled": {
      color: "rgba(255,255,255,50%)",
      backgroundColor: "transparent",
    }
  },
}))

const PaginatedTable=({columns,entities}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes=useStyles()
  return (
    <>
      <TableContainer className={classes.root}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  // style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {entities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(row)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 7, 10]}
        component="div"
        count={entities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </>
  );
}

export default PaginatedTable;
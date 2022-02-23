import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from "@material-ui/core";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    overflow: "hidden",
    color: "#fff",
    "& .MuiTableContainer-root": {
      maxHeight: "100%",
      // overflow: "auto",
    },
    "& .MuiTableCell-body": {
      color: "rgba(255,255,255,50%)"
    },
    "& .MuiTableCell-root": {
      padding: "1em 0.6em",
      borderBottom: 0
    },
    "& .MuiTableCell-stickyHeader": {
      backgroundColor: theme.palette.primary.dark,
      color: "rgba(255,255,255,50%)"
    },
  },
  pagination: {
    "& .MuiTablePagination-toolbar": {
      backgroundColor: theme.palette.primary.dark,
      color: "rgba(255,255,255,50%)"
    },
    "& .MuiIconButton-root.Mui-disabled": {
      color: "rgba(255,255,255,50%)",
      backgroundColor: "transparent",
    }
  },
}))

const PaginatedTable = ({ columns, fetchData, data, totalCount, navigation, params}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    setLoading(true);
    if(params){
      fetchData(page, rowsPerPage,params)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => setLoading(false));
    }else {
      fetchData(page, rowsPerPage)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => setLoading(false));
    }
  }, [page, rowsPerPage,params]);

  useEffect(() => {
    setCurrentData([...data]);
    setTotalSize(totalCount);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles()
  return (
    <>
      <TableContainer className={classes.root}>
        {loading && <Loader />}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.label} onClick={() => { navigation && navigation(row._id) }}>
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
        count={totalSize}
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
import React, { useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useStyles } from "./style";
import Skeleton from "@material-ui/lab/Skeleton";
import { EnhancedTableHead } from "./TableHead";
import { EnhancedTableToolbar } from "./ToolBar";
import { EMPTY_TABLE } from "constants/index";
import DoneIcon from "@material-ui/icons/Done";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable(props) {
  const {
    dataTable,
    headTable,
    rowIdName,
    toolBar,
    reloadCallback,
    titleTable,
    customColumn,
    transformColumn,
    toolBarPresent,
  } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [filtroData, setFiltroData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [typingTimeout, SetTyping] = React.useState(0);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    setSelected([]);
  }, [dataTable]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      if (dataTable == null) return;
      const newSelecteds = dataTable.map((n) => n[rowIdName]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const isTransformColumn = (key) =>
    transformColumn !== undefined &&
    (transformColumn[key] != null || transformColumn[key] !== undefined);

  const isCustom = (key) =>
    customColumn !== undefined &&
    (customColumn[key] != null || customColumn[key] !== undefined);

  const transformDataColumn = (column, row) => {
    let colData = null;
    if (isTransformColumn(column.key)) {
      colData = transformColumn[column.key](row[column.key]);
    }
    if (isCustom(column.key)) {
      row[column.key] = colData == null ? row[column.key] : colData;
      colData = customColumn[column.key](row);
    } else if (colData == null) {
      colData = row[column.key];
    }
    return colData;
  };

  //Realizando la filtracion
  const searchData = (pattern) => {
    let filtro = [];
    if (pattern.trim().length === 0) {
      setFiltroData(filtro);
      return;
    }
    dataTable.forEach((item) => {
      let oneOkey = false;
      headTable.forEach((h) => {
        if (oneOkey) return;
        if (item[h.key] === null) return;

        if (isTransformColumn(h.key)) {
          if (
            transformColumn[h.key](item[h.key])
              .toUpperCase()
              .includes(pattern.trim().toUpperCase())
          ) {
            filtro.push(item);
            oneOkey = true;
            return;
          }
        } else if (
          item[h.key].toUpperCase().includes(pattern.trim().toUpperCase())
        ) {
          filtro.push(item);
          oneOkey = true;
          return;
        }
      });
    });
    setFiltroData(filtro);
  };

  const callbackAfterTyping = (pattern) => {
    var busqueda = pattern;
    clearTimeout(typingTimeout);
    SetTyping(
      setTimeout(() => {
        searchData(busqueda);
      }, 500)
    );
  };

  const emptyRows =
    dataTable == null
      ? 0
      : rowsPerPage -
        Math.min(rowsPerPage, dataTable.length - page * rowsPerPage);

  const skeletonRow = (key) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={key + "ske"}>
        {headTable.map((c, ii) => (
          <TableCell scope="row" key={ii + "ed"} align="left">
            <Skeleton />
          </TableCell>
        ))}
      </TableRow>
    );
  };
  const buildSkeleton = () => {
    return (
      <TableBody>
        {[1, 2, 3, 4, 5, 6].map((e, index) => skeletonRow(index))}
      </TableBody>
    );
  };
  const buildTableBody = () => {
    return (
      <TableBody>
        {stableSort(
          filtroData.length > 0 ? filtroData : dataTable,
          getComparator(order, orderBy)
        )
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row[rowIdName]);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow
                hover
                onClick={
                  toolBarPresent
                    ? (event) => handleClick(event, row[rowIdName])
                    : null
                }
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row[rowIdName] + "click"}
                selected={isItemSelected}
              >
                {selected.length === 0 ? null : (
                  <TableCell align="center">
                    {isItemSelected ? <DoneIcon /> : null}
                  </TableCell>
                )}
                {headTable.map((c, ii) => (
                  <TableCell scope="row" align="left" key={ii + "clumn"}>
                    {transformDataColumn(c, row)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
            <TableCell colSpan={headTable.length + 1} />
          </TableRow>
        )}
      </TableBody>
    );
  };
  const tableBodyEmpty = () => {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={headTable.length + 1} className={classes.empty}>
            {EMPTY_TABLE}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  return (
    <div className={classes.root} key="tabla">
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          actionToolbar={toolBar}
          onAfterTyping={callbackAfterTyping}
          rowIds={selected}
          title={titleTable}
          toolBarShow={toolBarPresent}
          reloadCallback={reloadCallback}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              headCells={headTable}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataTable == null ? 0 : dataTable.length}
            />
            {dataTable == null
              ? buildSkeleton()
              : dataTable.length === 0
              ? tableBodyEmpty()
              : buildTableBody()}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataTable == null ? 0 : dataTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

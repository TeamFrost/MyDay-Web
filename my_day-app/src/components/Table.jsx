import React from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';


const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: '#508ff4',
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = [
  ['Jane', 'Lin', 'janeyy', 25, 'USA', 54],
  ['Mike', 'Ross', 'MikeR', 33, 'Canada', 103],
  ['Rachel', 'Green', 'green', 19, 'UK', 855],
  ['Alex', 'Price', 'Alexx', 22, 'Italy', 4],
  ['Maria', 'Gonzales', 'Maria_Gonzales', 45, 'Spain', 554],
  ['Lu', 'Han', 'itslu', 37, 'Japan', 98],
  ['Klaus', 'Gratz', 'KlausGratz', 20, 'Germany', 401],
  ['Thomas', 'Lee', 'Lee.Tom', 30, 'Norway', 267],
  ['Steve', 'Rogers', 'Cap', 40, 'Australia', 16],
  ['Natasha', 'Romanoff', 'black_nat', 35, 'Russia', 487],
  ['Ahmed', 'Mohammed', 'MohA', 55, 'Algeria', 1520],
  ['Ron','Thompson','Ronny221', 22, 'Ireland', 189],
  ['Denise','Martin','CoffeeLover', 19, 'Holland', 905],
  ['Xi','Chong','AsianXI', 44, 'South Korea', 330],
  ['Esteban','Aruba','ArubaEste', 33, 'Columbia', 490],
  ['Ramesh','Kumar','99Kuma99', 18, 'India', 335],
];

function createData(id, firstname, lastname, username, age, country, stars) {
  return { id, firstname, lastname, username, age, country, stars };
}

const rows = [];

for (let i = 0; i < 100; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

export default function ReactVirtualizedTable() {
  return (
    <Paper elevation={10} style={{ height: 730, width: 900, marginTop: 80, borderRadius: 20, marginLeft: 20 }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 150,
            label: 'First Name',
            dataKey: 'firstname',
          },
          {
            width: 150,
            label: 'Last Name',
            dataKey: 'lastname',

          },
          {
            width: 150,
            label: 'Username',
            dataKey: 'username',

          },
          {
            width: 150,
            label: 'Age',
            dataKey: 'age',
            //numeric: true,
          },
          {
            width: 150,
            label: 'Country',
            dataKey: 'country',

          },
          {
            width: 150,
            label: 'Stars',
            dataKey: 'stars',
            //numeric: true,
          },
        ]}
=======
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'FirstName', label: 'First Name', minWidth: 120 },
  { id: 'LastName', label: 'Last Name', minWidth: 120 },
  { id: 'Email', label: 'Email', minWidth: 120 },
  { id: 'Country', label: 'Country', minWidth: 120 },
  { id: 'Age', label: 'Age', minWidth: 60 },
  { id: 'Stars', label: 'Stars', minWidth: 60 },

];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 1200,
    margin: 80,
    marginLeft: 20,
  },
  container: {
    maxHeight: 720,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
>>>>>>> 76088c93f9ff42bcb77a86afd68ad14f852c97f0
      />
    </Paper>
  );
}
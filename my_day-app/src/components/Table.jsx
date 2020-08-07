import React from 'react';
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
      />
    </Paper>
  );
}
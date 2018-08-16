import React from 'react';
import LogTableData from './logTableData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const LogTable = ({
  data = [],
  handleChangeStatus = f => f,
  //   handleClick = f => f,
  // handleDeleteClick = f => f,
  //   copyInstanceKey = f => f,
}) => {
  return (
    <div>
      <Table className="my-table">
        <TableHead>
          <TableRow>
            <TableCell numeric>ID</TableCell>
            <TableCell>PROJECT</TableCell>
            <TableCell>INSTANCE</TableCell>
            <TableCell>ISSUED AT</TableCell>
            <TableCell>LOG TYPE</TableCell>
            <TableCell>LOG DESCRIPTION</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>STATUS</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <LogTableData
            data={data}
            handleChangeStatus={handleChangeStatus}
            // copyInstanceKey={copyInstanceKey}
            // handleClick={handleClick}
            // handleDeleteClick={handleDeleteClick}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default LogTable;

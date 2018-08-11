import React from 'react';
import TableData from './ProjectTableData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const table = ({
  data = [],
  handleClick = f => f,
  handleDeleteClick = f => f,
}) => {
  return (
    <div>
      <Table className="my-table">
        <TableHead>
          <TableRow>
            <TableCell numeric>ID</TableCell>
            <TableCell>PROJECT NAME</TableCell>
            <TableCell>DELETE</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableData
            data={data}
            handleClick={handleClick}
            handleDeleteClick={handleDeleteClick}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default table;

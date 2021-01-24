import React from 'react';
import ProjectInstanceTableData from './ProjectInstanceTableData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const projectInstanceTable = ({
  data = [],
  handleClick = f => f,
  handleDeleteClick = f => f,
  copyInstanceKey = f => f,
}) => {
  return (
    <div>
      <Table className="my-table">
        <TableHead>
          <TableRow>
            <TableCell numeric>ID</TableCell>
            <TableCell>INSTANCE NAME</TableCell>
            <TableCell>PROJECT</TableCell>
            <TableCell>INSTANCE KEY</TableCell>
            <TableCell>DELETE</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <ProjectInstanceTableData
            data={data}
            copyInstanceKey={copyInstanceKey}
            handleClick={handleClick}
            handleDeleteClick={handleDeleteClick}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default projectInstanceTable;

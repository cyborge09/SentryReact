import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TableData = ({
  data = [],
  handleClick = f => f,
  handleDeleteClick = f => f,
}) => {
  return data.map((data, i) => (
    <TableRow key={i}>
      <TableCell>{i + 1}</TableCell>
      <TableCell
        className="td"
        onClick={() => {
          handleClick(data.project_name);
        }}
      >
        {data.project_name}
      </TableCell>
      <TableCell
        className="delete"
        onClick={() => {
          handleDeleteClick(data.id, data.project_name);
        }}
      >
        <img src={require('../img/delete.png')} alt="delete" />
      </TableCell>
    </TableRow>
  ));
};

export default TableData;

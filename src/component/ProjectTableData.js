import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const TableData = ({
  data = [],
  handleUpdateClick = f => f,
  handleClick = f => f,
  handleDeleteClick = f => f,
}) => {
  return data.map((data, i) => (
    <TableRow key={i}>
      <TableCell>{i + 1}</TableCell>
      <TableCell
        className="td"
        onClick={() => {
          // handleClick(data.project_name);
          handleClick({ id: data.id, name: data.project_name });
        }}
      >
        {data.project_name}
      </TableCell>
      <TableCell
        onClick={() => {
          // handleClick(data.project_name);
        }}
      >
        {data.description}
      </TableCell>
      <TableCell
        onClick={() => {
          handleUpdateClick(data);
        }}
      >
        <Tooltip TransitionComponent={Zoom} placement="top" title="update">
          <img src={require('../img/update.png')} alt="delete" />
        </Tooltip>
      </TableCell>
      <TableCell
        onClick={() => {
          handleDeleteClick(data.id, data.project_name);
        }}
      >
        <Tooltip TransitionComponent={Zoom} placement="top" title="Delete">
          <img src={require('../img/delete.png')} alt="delete" />
        </Tooltip>
      </TableCell>
    </TableRow>
  ));
};

export default TableData;

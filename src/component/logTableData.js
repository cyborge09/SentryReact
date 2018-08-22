import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const getIssuedAt = data => {
  var issuedAt = data
    .split('T')
    .join(', ')
    .split('Z');

  return issuedAt[0];
};

const TableData = ({
  data = [],
  handleChangeStatus = f => f,
  //   handleClick = f =s> f,
  //   handleDeleteClick = f => f,
  handleClick = f => f,
  handleDeleteClick = f => f,
}) => {
  return data.map((data, i) => (
    <TableRow key={i}>
      <TableCell>{i + 1}</TableCell>
      <TableCell>{data.project_name}</TableCell>

      <TableCell>{data.instance_name}</TableCell>

      <TableCell onClick={() => {}}>{getIssuedAt(data.updated_at)}</TableCell>

      <TableCell id="log-type">
        {data.type}
        <Tooltip TransitionComponent={Zoom} placement="top" title="Details">
          <img
            src={require('../img/details.png')}
            alt="details"
            onClick={() => {
              handleClick(data, getIssuedAt(data.updated_at));
            }}
          />
        </Tooltip>
      </TableCell>

      <TableCell
        className="delete"
        onClick={() => {
          handleDeleteClick(data.id);
        }}
      >
        <img src={require('../img/delete.png')} alt="delete" />
      </TableCell>

      <TableCell>
        <Switch
          disableRipple
          checked={data.resolved}
          onChange={() => handleChangeStatus(data.id)}
          color="primary"
        />
      </TableCell>
    </TableRow>
  ));
};

export default TableData;

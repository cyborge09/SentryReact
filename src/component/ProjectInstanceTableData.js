import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const projectInstanceTableData = ({
  data = [],
  // handleClick = f => f,
  // handleDeleteClick = f => f,
  copyInstanceKey = f => f,
}) => {
  return data.map((data, i) => (
    <TableRow key={i}>
      <TableCell>{i + 1}</TableCell>

      <TableCell
        className="td"
        onClick={() => {
          // handleClick(data.project_name);
          console.log('handleclick');
        }}
      >
        {data.instance_name}
      </TableCell>

      <TableCell className="instanceKey">
        {data.instance_key}
        <CopyToClipboard text={data.instance_key}>
          <img src={require('../img/copy.png')} alt="Copy" />
        </CopyToClipboard>
      </TableCell>

      <TableCell
        className="delete"
        onClick={() => {
          // handleDeleteClick(data.id, data.project_name);
          console.log('handleclick');
        }}
      >
        <img src={require('../img/delete.png')} alt="delete" />
      </TableCell>
    </TableRow>
  ));
};

export default projectInstanceTableData;

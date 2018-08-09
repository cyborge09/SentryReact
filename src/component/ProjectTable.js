import React from 'react';
import TableData from './ProjectTableData';

const Table = ({
  data = [],
  handleClick = f => f,
  handleDeleteClick = f => f,
}) => {
  return (
    <div>
      <table className="my-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>PROJECT NAME</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          <TableData
            data={data}
            handleClick={handleClick}
            handleDeleteClick={handleDeleteClick}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Table;

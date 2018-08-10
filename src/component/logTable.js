import React from 'react';

const LogTable = () => {
  return (
    <div>
      <h2>Log Table </h2>

      <table className="log-table">
        <thead>
          <tr>
            <th>sn</th>
            <th>Error Code</th>
            <th>Error Message</th>
            <th>Project Instance</th>
            <th> proprity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>400</td>
            <td>authentication error</td>
            <td>5 -434434334-434</td>
            <td>very urgent</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;

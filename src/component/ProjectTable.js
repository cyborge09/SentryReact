import React from 'react';
import TableData from './ProjectTableData';

const Table = ({ data = [], handleClick = () => { } }) => {
    console.log("data", data)
    return (
        <div>
            <table className='my-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PROJECT NAME</th>
                        <th>DELETE</th>
                    </tr>
                </thead>

                <tbody>
                    <TableData data={data} handleClick={handleClick} />
                </tbody>
            </table>
        </div>
    );
};

export default Table;
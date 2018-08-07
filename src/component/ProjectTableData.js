import React from 'react';

const TableData = ({ data = [], handleClick = () => { } }) => {


    return (
        data.map((data, i) =>
            <tr key={i} className='tr'>
                <td className='td'>{i + 1}</td>
                <td className='td' onClick={() => { handleClick(data.project_name) }}>{data.project_name}</td>
                <td className='td' onClick={() => { console.log("delete", data.project_name) }}><img src={require('../img/delete.png')} alt="delete" /></td>
            </tr>
        )
    )
}

export default TableData;
import React from 'react';
import TableData from './ProjectTableData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

const table = ({
    data = [],
    handleClick = f => f,
    handleDeleteClick = f => f,
    handleSort = f => f,
    handleUpdateClick = f => f,
    sortDirection,
    columnToSort,
}) => {
    return (
        <div>
            <Table className="my-table">
                <TableHead>
                    <TableRow>
                        <TableCell numeric>ID</TableCell>
                        <TableCell onClick={() => handleSort('project_name')}>
                            <span>PROJECT</span>
                            {columnToSort === 'project_name' ? (
                                sortDirection === 'asc' ? (
                                    <ArrowUpward />
                                ) : (
                                    <ArrowDownward />
                                )
                            ) : null}
                        </TableCell>
                        <TableCell>DESCRIPTION</TableCell>
                        <TableCell>UPDATE</TableCell>
                        <TableCell>DELETE</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableData
                        data={data}
                        handleClick={handleClick}
                        handleDeleteClick={handleDeleteClick}
                        handleUpdateClick={handleUpdateClick}
                    />
                </TableBody>
            </Table>
        </div>
    );
};

export default table;

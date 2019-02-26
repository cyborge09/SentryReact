import React from 'react';
import LogTableData from './logTableData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

const LogTable = ({
	data = [],
	handleChangeStatus = f => f,
	handleSort = f => f,
	sortDirection,
	columnToSort,
	checkedState,
	// handleDeleteClick = f => f,
	handleClick = f => f,
	handleDeleteClick = f => f,
	//   copyInstanceKey = f => f,
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
						<TableCell onClick={() => handleSort('instance_name')}>
							<span>INSTANCE</span>
							{columnToSort === 'instance_name' ? (
								sortDirection === 'asc' ? (
									<ArrowUpward />
								) : (
									<ArrowDownward />
								)
							) : null}
						</TableCell>
						<TableCell onClick={() => handleSort('updated_at')}>
							<span>
								{' '}
								ISSUED AT
								{columnToSort === 'updated_at' ? (
									sortDirection === 'asc' ? (
										<ArrowDownward />
									) : (
										<ArrowUpward />
									)
								) : (
									<ArrowDownward />
								)}
							</span>
						</TableCell>
						<TableCell>LOG TYPE</TableCell>
						<TableCell>Delete</TableCell>
						<TableCell onClick={() => handleSort('resolved')}>
							<span>STATUS</span>
							{columnToSort === 'resolved' ? (
								sortDirection === 'asc' ? (
									<ArrowUpward />
								) : (
									<ArrowDownward />
								)
							) : (
								<ArrowDownward />
							)}
						</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					<LogTableData
						data={data}
						handleChangeStatus={handleChangeStatus}
						checkedState={checkedState}
						// copyInstanceKey={copyInstanceKey}
						handleClick={handleClick}
						handleDeleteClick={handleDeleteClick}
					/>
				</TableBody>
			</Table>
		</div>
	);
};

export default LogTable;

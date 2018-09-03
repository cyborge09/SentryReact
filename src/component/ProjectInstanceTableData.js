import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const projectInstanceTableData = ({
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
					handleClick(
						window.location.pathname,
						data.id,
						data.instance_name,
						data.project_id
					);
				}}
			>
				{data.instance_name}
			</TableCell>
			<TableCell>{data.project_name}</TableCell>
			<TableCell className="instanceKey">
				{data.instance_key}
				<Tooltip TransitionComponent={Zoom} placement="top" title="Copy">
					<CopyToClipboard text={data.instance_key}>
						<img src={require('../img/copy.png')} alt="Copy" />
					</CopyToClipboard>
				</Tooltip>
			</TableCell>

			<TableCell
				className="delete"
				onClick={() => {
					handleDeleteClick(data.id, data.instance_name);
				}}
			>
				<Tooltip TransitionComponent={Zoom} placement="top" title="Delete">
					<img src={require('../img/delete.png')} alt="delete" />
				</Tooltip>
			</TableCell>
		</TableRow>
	));
};

export default projectInstanceTableData;

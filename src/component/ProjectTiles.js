import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { getIssuedAt } from '../utils/extra';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#5c6bc0',
		},
		secondary: {
			main: '#d81b60',
		},
	},
});

const ProjectTiles = ({
	data = [],
	handleClick = f => f,
	handleDeleteClick = f => f,
	handleSort = f => f,
	handleUpdateClick = f => f,
	sortDirection,
	columnToSort,
}) => {
	console.log(data);
	return data.map((data, i) => (
		<div key={i} className="tile-data-wrapper">
			<div className="tiles">
				<div className="top-part">
					<div className="top-left-wrapper">
						<div className="icon">
							<img
								src="https://75ff019b64fc4358.freetls.fastly.net/_static/113e47fd7134bb803e9e369561616bdc/sentry/dist/generic.svg"
								className="css-xyllcc ezvce7z1"
								width="24px"
								height="24px"
								alt=""
							/>
						</div>

						<div
							className="project-name"
							onClick={() => {
								// handleClick(data.project_name);
								handleClick({ id: data.id, name: data.project_name });
							}}
						>
							<span>{data.project_name}</span>
						</div>
					</div>
					<div
						className="top-right-wrapper"
						onClick={() => {
							//description details
						}}
					>
						<Tooltip
							TransitionComponent={Zoom}
							placement="top"
							title={getIssuedAt(data.updated_at)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								color="black"
								fill=" currentColor"
							>
								<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
							</svg>
						</Tooltip>
					</div>
				</div>
				<div className="middle-part-wrapper">
					<div className="middle-description-part">
						<div className="description">
							{data.description ? (
								<span>{data.description}</span>
							) : (
								<span style={{ color: 'rgb(168, 137, 177)' }}>
									NO DESCRIPTION
								</span>
							)}
						</div>
					</div>
				</div>

				<hr />
				<div className="bottom-part-wrapper">
					<div className="bottom-part">
						<div
							className="buttons"
							onClick={() => {
								handleDeleteClick(data.id, data.project_name);
							}}
						>
							<MuiThemeProvider theme={theme}>
								<Tooltip
									TransitionComponent={Zoom}
									placement="top"
									title="Delete"
								>
									<DeleteOutlinedIcon color="primary" />
								</Tooltip>
							</MuiThemeProvider>
						</div>
						<div
							className="buttons"
							onClick={() => {
								handleUpdateClick(data);
							}}
						>
							<MuiThemeProvider theme={theme}>
								<Tooltip
									TransitionComponent={Zoom}
									placement="top"
									title="Update"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										color="#5c6bc0"
										fill=" currentColor"
									>
										<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
									</svg>
								</Tooltip>
							</MuiThemeProvider>
						</div>
					</div>
				</div>
			</div>
		</div>
	));
};

export default ProjectTiles;

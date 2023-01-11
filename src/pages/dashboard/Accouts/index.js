


import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Popconfirm, message } from 'antd'

import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';

import Page from '../../../components/Page';

const PageTitle = styled('div')(({ theme }) => ({
	backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
}));


export default function EcommerceProductList() {
	const [data, setData] = useState([]);
	const [change, SetChange] = useState(false);

	const renderDetailsButton = (params) => {
		return (
			<>
				<Link to={`/dashboard/account/edit/${params.row.id}`} style={{ textDecoration: 'none' }}>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						style={{ marginLeft: 16 }}
					>
						Edit
					</Button>
				</Link>
				<Popconfirm
					title="Delete the task"
					description="Are you sure to delete this account?"
					onConfirm={() => handleDelete(params)}
					okText="Yes"
					cancelText="No"
				>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						style={{ marginLeft: 16 }}
					>
						Delete
					</Button>
				</Popconfirm>
			</>
		)
	}

	const renderColorCode = (params) => {
		return (
			<Box sx={{ px: '10px', py: '5px', background: params.row.colourCode }}></Box>
		)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 30 },
		{ field: 'username', headerName: 'Name', width: 150 },
		{ field: 'email', headerName: 'Email', width: 250 },
		{ field: 'colourCode', headerName: 'Colour Code', width: 200, renderCell: renderColorCode },
		{ field: 'staff', headerName: 'Staff', width: 150 },
		{ field: 'permissions', headerName: 'Permissions', width: 200 },
		{ field: 'action', headerName: 'Action', renderCell: renderDetailsButton, sortable: false, width: 200 }
	];

	const handleDelete = (e) => {
		console.log(e.row.id)
		axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteAccount`, { id: e.row.id })
			.then((res) => {
				if (res.data.flag === 'success') {
					message.config({ top: 100, duration: 5, });
					message.success('Successfully deleted.');
					SetChange(!change)
				}
			})
	}

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_SERVER_URL}/getusers`)
			.then((res) => {
				setData(res.data.data);
			})
	}, [change]);

	return (
		<>
			<Page title="The Yorkshire Resin Company Ltd | All Users">
				<PageTitle>
					<Typography
						color="text.primary"
						sx={{
							fontSize: '23px',
							fontWeight: 'bold',
							padding: '10px',
							mb: '20px'
						}}>
						All Users
					</Typography>
				</PageTitle>

				<Box sx={{ px: '20px' }}>
					<div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex' }}>
						<div style={{ flex: '1 1 0%', textAlign: 'right' }}>
							<Link to="/dashboard/account/add" style={{ textDecoration: 'none' }}>
								<Button variant="contained"> ADD </Button>
							</Link>
						</div>
					</div>
				</Box>
				<div style={{ height: '750px', width: '100%' }}>
					<DataGrid
						rows={data}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
						components={{
							Toolbar: GridToolbar,
						}}
						sx={{
							borderColor: 'primary.light'
						}}
					/>
				</div>
			</Page>
		</>
	);
}


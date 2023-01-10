



import React from 'react';
import { Table, Pagination, Space, Input } from 'antd';
import { Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Page from '../../components/Page';

export default function EcommerceProductList() {
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const columns = [
		{
			title: 'TITLE',
			dataIndex: 'title',
			sorter: (a, b) => a.name - b.name,
			defaultSortOrder: 'descend',
		},
		{
			title: 'CATEGORY',
			dataIndex: 'category',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'SUB-CATEGOTY',
			dataIndex: 'subcategory',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'SUB-SUB-CATEGORY ',
			dataIndex: 'sub2category',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'TAGS',
			dataIndex: 'tags',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'QUANTITY',
			dataIndex: 'quantity',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'ACTION',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<a><BorderColorOutlinedIcon sx={{ color: '#787878' }} /> {record.name}</a>
					<a><DeleteOutlinedIcon sx={{ color: '#787878' }} /></a>
					<a><MoreVertOutlinedIcon sx={{ color: '#787878' }} /></a>
				</Space>
			),
		},

	];
	const data = [
		{
			key: '1',
			title: 'John Brown',
			category: 32,
			subcategory: 'New York No. 1 Lake Park',
			sub2category: 'New York No. 1 Lake Park',
			status: 'New York No. 1 Lake Park',
			tags: 'New York No. 1 Lake Park',
			quantity: 'New York No. 1 Lake Park',
		},
		{
			key: '2',
			title: 'John Brown',
			category: 11,
			subcategory: 'qer',
			sub2category: '4ttw4t',
			status: 'serg',
			tags: 'sergsreg',
			quantity: 'he45he45s',
		},
	];
	const onChange = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const itemRender = (_, type, originalElement) => {
		if (type === 'prev') {
			return <Button variant="contained" color="success" >Previous</Button>;
		}
		if (type === 'next') {
			return <Button variant="contained" color="success"  >Next</Button>;
		}
		return originalElement;
	};
	return (
		<>
			<Page title="Materials">
				<Typography
					color="text.primary"
					sx={{
						fontSize: '23px',
						fontWeight: 'bold',
						background: '#E8F2F4',
						padding: '10px',
						mb: '20px'
					}}>
					Materials
				</Typography>
				<div style={{ display: 'flex', marginBottom: '15px' }}>
					<Box sx={{ minWidth: 120, mr: '20px' }}>
						<FormControl sx={{ width: '200px' }} size="small">
							<InputLabel id="select-company">Select Company</InputLabel>
							<Select
								labelId="select-company"
								id="company"
								value={age}
								label="Select Company"
								onChange={handleChange}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120, mr: '20px' }}>
						<FormControl sx={{ width: '200px' }} size="small">
							<InputLabel id="select-category">Select Category</InputLabel>
							<Select
								labelId="select-category"
								id="category"
								value={age}
								label="Select Company"
								onChange={handleChange}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120, mr: '20px' }}>
						<FormControl sx={{ width: '200px' }} size="small">
							<InputLabel id="select-subcategory">Select Sub Category</InputLabel>
							<Select
								labelId="select-subcategory"
								id="subcategory"
								value={age}
								label="Select Company"
								onChange={handleChange}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</div>

				<Divider />

				<div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex' }}>
					<FormControl sx={{ width: '100px' }} size="small">
						<InputLabel id="select-subcategory"></InputLabel>
						<Select
							labelId="select-subcategory"
							id="subcategory"
							value={age}
							onChange={handleChange}
						>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={30}>30</MenuItem>
						</Select>
					</FormControl>
					<div style={{ flex: '1 1 0%', textAlign: 'right' }}>
						<Input size="large" placeholder="Search..." style={{ width: '200px' }} />
						<Button variant="contained" sx={{ backgroundColor: "#9B7E4A", ml: '20px', mr: '20px' }} >
							Export
						</Button>
						<Button variant="contained" sx={{ backgroundColor: "#9B7E4A" }}>
							ADD
						</Button>
					</div>
				</div>

				<Table bordered='true' columns={columns} dataSource={data} onChange={onChange} />
				<Pagination total={20} itemRender={itemRender} style={{ marginTop: '20px', textAlign: 'right' }} />
			</Page>
		</>
	);
}
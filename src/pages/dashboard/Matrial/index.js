


import React, { useState, useEffect, useRef } from 'react';
import Pdf from 'react-to-pdf';
import { Table, Pagination, Space, Input, Button as Button2, Popconfirm, message, Tag } from 'antd';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditSharpIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import axios from 'axios';

import { TableContainer, Select, FormControl, MenuItem, InputLabel, Box, Divider, Typography, Button } from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import Page from '../../../components/Page';


const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
	},
}));


export default function EcommerceProductList() {
	const [age, setAge] = React.useState('');
	const [data, setData] = useState([]);
	const [perpage, setPerpage] = useState(10);
	const [current, setCurrent] = useState(1);
	const [total, setTotal] = useState(0);
	const [search, Setsearch] = useState('');
	const [search2, Setsearch2] = useState('');
	const [order, setOrder] = useState('descend');
	const [field, setField] = useState('material_id');
	const [refresh, Setrefresh] = useState(false);

	const ref1 = useRef();
	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const columns = [
		{
			title: 'REF',
			dataIndex: 'key',
			sorter: (a, b) => a.name - b.name,
			defaultSortOrder: 'descend',
		},
		{
			title: 'TITLE',
			dataIndex: 'title',
			sorter: (a, b) => a.name - b.name,
			// defaultSortOrder: 'descend',
		},
		{
			title: 'CATEGORY',
			dataIndex: 'category',
			// defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'SUB-CATEGORY',
			dataIndex: 'subcategory',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'SUB-SUB CATEGORY ',
			dataIndex: 'subsubcategory',
			// defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'TAGS',
			dataIndex: 'tags',
			sorter: (a, b) => a.age - b.age,
			render: (tags) => (
				JSON.parse(tags).map((tag, index) =>
					<Tag style={{ marginTop: '5px' }} key={index} color="#108ee9">{tag}</Tag>
				)
			)
		},
		{
			title: 'QUANTITY',
			dataIndex: 'quantity',
			// defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'ACTION',
			key: 'action',
			render: (_, material_id) => (
				<Space size="middle">
					<Link to={`/dashboard/materials/edit/${material_id.material_id}`}>
						<EditSharpIcon sx={{ color: '#768593' }} />
					</Link>
					<Popconfirm
						title="Are you sure to delete this task?"
						onConfirm={() => confirm(material_id)}
						okText="Yes"
						cancelText="No"
					>
						<DeleteOutlinedIcon sx={{ color: '#768593' }} />
					</Popconfirm>
					<a><MoreVertOutlinedIcon sx={{ color: '#768593' }} /></a>
				</Space>
			),
		},

	];

	const confirm = (e) => {
		console.log(e.material_id)
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/deletematerial`, { id: e.material_id })
			.then((res) => {
				console.log(res.data)
				if (res.data.flag === "success") {
					message.config({ top: 100, duration: 5, });
					message.info('Successfully delected');
					Setrefresh(!refresh);
				}
			})
			.catch((err) => {

			});
	};

	const onChange = (pagination, filters, sorter, extra) => {
		if (sorter.order) {
			setOrder(sorter.order);
			if (sorter.field === 'key') {
				setField('material_id');
			}
			else {
				setField(sorter.field);
			}

		}
		else {
			setOrder('descend');
			setField('material_id');
		}
	};

	const itemRender = (_, type, originalElement) => {
		if (type === 'prev') {
			return <Button2 type='primary'>Previous</Button2>;
		}
		if (type === 'next') {
			return <Button2 type='primary'>Next</Button2>;
		}
		return originalElement;
	};

	const onPageChange = (page, pageSize) => {
		console.log(page, pageSize)
		setCurrent(page);
		setPerpage(pageSize);
	}

	const handlekeypress = (event) => {
		if (event.key === "Enter") {
			Setsearch2(search);
		}
	}

	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/getmaterial`, { current: current, perpage: perpage, search: search2, order: order, field: field })
			.then((res) => {
				console.log(res.data.data)
				var temp = [];
				for (const i in res.data.data) {
					temp[i] = res.data.data[i];
					temp[i].key = parseInt(perpage * (current - 1)) + parseInt(i) + 1;
					temp[i].startdate = moment(res.data.data[i].startdate).format('YYYY-MM-DD');
				}
				setData(res.data.data);
				setTotal(res.data.total);
			})
			.catch((err) => {

			});
	}, [current, perpage, search2, order, field, refresh]);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Page title="The Yorkshire Resin Company Ltd | Matrials">
				<Typography
					color="text.primary"
					sx={{
						fontSize: '23px',
						fontWeight: 'bold',
						background: '#E8F2F4',
						padding: '10px',
						mb: '20px'
					}}>
					Matrials
				</Typography>

				<Box sx={{ px: '20px' }}>
					<Box className='select-toolbar'>
						<Box className='item' >
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
						<Box className='item' >
							<FormControl sx={{ width: '200px' }} size="small">
								<InputLabel id="select-category">Select Category</InputLabel>
								<Select
									labelId="select-category"
									id="category"
									value={age}
									label="select-category"
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
						<Box className='item' >
							<FormControl sx={{ width: '200px' }} size="small">
								<InputLabel id="select-subcategory">Select Sub Category</InputLabel>
								<Select
									labelId="select-subcategory"
									id="subcategory"
									value={age}
									label="select-subcategory"
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
					</Box>

					<Divider />

					<Box className='toolbar'>
						<FormControl sx={{ width: '100px' }} size="small">
							<InputLabel id="select-subcategory"></InputLabel>
							<Select
								labelId="select-subcategory"
								id="subcategory"
								value={perpage}
								onChange={(e) => setPerpage(e.target.value)}
							>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={25}>25</MenuItem>
								<MenuItem value={50}>50</MenuItem>
							</Select>
						</FormControl>
						<div style={{ flex: '1 1 0%', textAlign: 'right' }}>
							<Input onChange={(e) => Setsearch(e.target.value)} onKeyPress={handlekeypress} size="large" placeholder="Search..." style={{ width: '200px' }} />
							<Button
								sx={{ ml: '20px', mr: '20px' }}
								id="demo-customized-button"
								aria-controls={open ? 'demo-customized-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								variant="outlined"
								disableElevation
								onClick={handleClick}
								endIcon={<KeyboardArrowDownIcon />}
							>
								Export
							</Button>
							<StyledMenu
								id="demo-customized-menu"
								MenuListProps={{
									'aria-labelledby': 'demo-customized-button',
								}}
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose} >
									<Pdf targetRef={ref1} filename="document.pdf">
										{({ toPdf }) => (
											<div onClick={toPdf} className="button">
												Export as PDF
											</div>
										)}
									</Pdf>
								</MenuItem>
							</StyledMenu>
							<Link to="/dashboard/materials/add" style={{ textDecoration: 'none' }}>
								<Button variant="contained"> ADD </Button>
							</Link>
						</div>
					</Box>
				</Box>
				<Box >
					<Table className='table-scroll' bordered='true' columns={columns} dataSource={data} onChange={onChange} />
				</Box>
				<Pagination
					onChange={onPageChange}
					total={total}
					// itemRender={itemRender}
					pageSize={perpage}
					style={{ marginTop: '20px', textAlign: 'right' }} />
			</Page>
		</>
	);
}


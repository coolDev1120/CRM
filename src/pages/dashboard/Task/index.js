/* eslint-disable jsx-a11y/anchor-is-valid */



import React, { useState, useEffect, useRef } from 'react';
import Pdf from 'react-to-pdf';
import { Table, Pagination, Space, Input, Select as Select2, Popconfirm, message, Tag } from 'antd';
import { Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import axios from 'axios';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
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
	const [data, setData] = useState([]);
	const [perpage, setPerpage] = useState(10);
	const [current, setCurrent] = useState(1);
	const [total, setTotal] = useState(0);
	const [search, Setsearch] = useState('');
	const [search2, Setsearch2] = useState('');
	const [order, setOrder] = useState('descend');
	const [field, setField] = useState('task_id');
	const [refresh, Setrefresh] = useState(false);
	const [companies, setCompany] = useState([]);
	const [selectedCompany, setSelectedCompany] = useState('none')

	const ref1 = useRef();
	const columns = [
		{
			title: 'REF',
			dataIndex: 'key',
		},
		{
			title: 'THE TASKS',
			dataIndex: 'description',
			sorter: (a, b) => a.name - b.name,
		},
		{
			title: 'STATUS',
			dataIndex: 'category',
			sorter: (a, b) => a.age - b.age,
			render: () => (
				<Tag color="#108ee9">INVOICE SENT</Tag>
			)
		},
		{
			title: 'RESPONSIBLE',
			dataIndex: 'responsible',
			render: (responsible) => (
				JSON.parse(responsible).map((tag, index) =>
					<span key={index}>{tag}, </span>
				)
			)
		},
		{
			title: 'DATE CRE',
			dataIndex: 'createdAt',
			sorter: (a, b) => a.age - b.age,
			render: (createdAt) => (
				<div>{moment(createdAt).format('YYYY-MM-DD')}</div>
			)
		},
		{
			title: 'TIME',
			dataIndex: 'createdAt',
			sorter: (a, b) => a.age - b.age,
			render: (createdAt) => (
				<div>{moment(createdAt).format('HH:mm')}</div>
			)
		},
		{
			title: 'DEADLINE',
			dataIndex: 'status',
			// defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'ASSIGN NEW',
			dataIndex: 'status',
			// defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'CATEGORY',
			dataIndex: 'status',
			// defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'ACTION',
			key: 'action',
			render: (_, task_id) => (
				<Space size="middle">
					<Link to={`/dashboard/task/edit/${task_id.task_id}`}>
						<AppRegistrationIcon sx={{ color: '#424242' }} />
					</Link>
					<Popconfirm
						title="Are you sure to delete this task?"
						onConfirm={() => confirm(task_id)}
						okText="Yes"
						cancelText="No"
					>
						<DeleteSweepIcon sx={{ color: '#424242' }} />
					</Popconfirm>
					<a><MoreVertOutlinedIcon sx={{ color: '#424242' }} /></a>
				</Space>
			),
		},

	];

	const confirm = (e) => {
		console.log(e.task_id)
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/deletetask`, { id: e.task_id })
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
				setField('task_id');
			}
			else {
				setField(sorter.field);
			}

		}
		else {
			setOrder('descend');
			setField('task_id');
		}
	};

	// const itemRender = (_, type, originalElement) => {
	// 	if (type === 'prev') {
	// 		return <Button2 type='primary'>Previous</Button2>;
	// 	}
	// 	if (type === 'next') {
	// 		return <Button2 type='primary'>Next</Button2>;
	// 	}
	// 	return originalElement;
	// };

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
		// get Companies
		axios.post(`${process.env.REACT_APP_SERVER_URL}/getCompany`)
			.then((res) => {
				var temp = [];
				for (let i = 0; i < res.data.length; i++) {
					let val = {}
					val.value = res.data[i].id;
					val.label = res.data[i].company_name;
					temp.push(val)
				}
				console.log(temp)
				setCompany(temp)
			})
	}, []);

	useEffect(() => {
		var selectOption = []
		if (selectedCompany !== 'none') {
			selectOption.push({ name: 'company', value: selectedCompany })
		}

		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/gettask`, { current: current, perpage: perpage, search: search2, order: order, field: field, option: selectOption })
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
	}, [current, perpage, search2, order, field, refresh, selectedCompany]);

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
			<Page title="The Yorkshire Resin Company Ltd | Tasks">
				<Typography
					color="text.primary"
					sx={{
						textTransform: 'uppercase',
						fontSize: '23px',
						fontWeight: 'bold',
						background: '#E8F2F4',
						padding: '10px',
						mb: '20px'
					}}>
					tasks
				</Typography>

				<Box >
					<Box className='select-toolbar'>
						<Box className='item' >
							<FormControl sx={{ width: '200px' }} size="small">
								<InputLabel id="select-company">Select Company</InputLabel>
								<Select
									labelId="select-company"
									id="company"
									value={selectedCompany}
									label="Select Company"
									onChange={(e) => setSelectedCompany(e.target.value)}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{companies.map((val) =>
										<MenuItem key={val.value} value={val.value}>{val.label}</MenuItem>
									)}
								</Select>
							</FormControl>
						</Box>
					</Box>

					<Divider sx={{ borderColor: '#000000ad' }} />

					<div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex' }}>
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
							<Button sx={{ mx: '20px' }} variant="outlined" startIcon={<UpgradeIcon />} endIcon={<KeyboardArrowDownIcon />}>
								CSV import
							</Button>
							<Button
								sx={{ mr: '20px' }}
								id="demo-customized-button"
								aria-controls={open ? 'demo-customized-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								variant="outlined"
								disableElevation
								onClick={handleClick}
								startIcon={<UpgradeIcon />}
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
							<Link to="/dashboard/task/add" style={{ textDecoration: 'none' }}>
								<Button variant="contained"> ADD </Button>
							</Link>
						</div>
					</div>
				</Box>
				<Box ref={ref1}>
					<Table bordered='true' columns={columns} dataSource={data} onChange={onChange} />
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


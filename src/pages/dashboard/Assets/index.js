/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import Pdf from 'react-to-pdf';
import { Table, Pagination, Space, Input, Popconfirm, message } from 'antd';
// icons
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
import { Select, FormControl, MenuItem, InputLabel, Box, Divider, Typography, Button } from '@mui/material'
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
    const [field, setField] = useState('id');
    const [refresh, Setrefresh] = useState(false);
    const [companies, setCompany] = useState([])
    const [selectedCompany, setSelectedCompany] = useState('none')
    const [teams, setTeam] = useState([])

    const ref1 = useRef();

    const columns = [
        {
            title: 'REF',
            dataIndex: 'key',
        },
        {
            title: 'TITLE',
            dataIndex: 'assets_type',
            sorter: (a, b) => a.name - b.name,
        },
        {
            title: 'COMPANY',
            dataIndex: 'company',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'VALUE',
            dataIndex: 'assets_value',
            sorter: (a, b) => a.age - b.age,
            render: (assets_value) => (
                <span className='assets-value'>£{assets_value}</span>
            ),
        },
        {
            title: 'ASSIGNED TEAM',
            dataIndex: 'assigned_team',
            sorter: (a, b) => a.age - b.age,
            render: (_, id) => (
                <>
                    {id.team_color &&
                        <span style={{ padding: '2px 5px', color: '#fff', background: id.team_color }}>{id.assigned_team}</span>
                    }
                </>
            ),
        },
        {
            title: 'DATE',
            dataIndex: 'purchased_date',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'CALENDAR',
            dataIndex: 'service_date',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'SET REMINDER',
            dataIndex: 'set_reminders',
            sorter: (a, b) => a.age - b.age,
            render: (set_reminders) => (
                <>
                    <span style={{ margin: '0 5px', padding: '5px' }} className={set_reminders && 'set_reminder'}>YES</span>
                    <span style={{ margin: '0 5px', padding: '5px' }} className={!set_reminders && 'set_reminder'}>NO</span>
                </>
            ),
        },
        {
            title: 'SERVICE',
            dataIndex: 'service_required',
            sorter: (a, b) => a.age - b.age,
            render: (service_required) => (
                <>
                    <span style={{ margin: '0 5px', padding: '5px' }} className={service_required && 'set_reminder'}>YES</span>
                    <span style={{ margin: '0 5px', padding: '5px' }} className={!service_required && 'set_reminder'}>NO</span>
                </>
            ),
        },
        {
            title: 'TAGS',
            dataIndex: '',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'MANAGE',
            key: 'action',
            render: (_, id) => (
                <Space size="middle">
                    <Link to={`/dashboard/assets/edit/${id.id}`}>
                        <AppRegistrationIcon sx={{ color: '#424242' }} />
                    </Link>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        onConfirm={() => confirm(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteSweepIcon sx={{ cursor: 'pointer', color: '#424242' }} />
                    </Popconfirm>
                    <a><MoreVertOutlinedIcon sx={{ color: '#424242', cursor: 'pointer' }} /></a>
                </Space>
            ),
        },

    ];

    const confirm = (e) => {
        console.log(e.id)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteAssets`, { id: e.id })
            .then((res) => {
                console.log(res.data)
                if (res.data.flag === "success") {
                    message.config({ top: 100, duration: 5, });
                    message.info('Successfully delected');
                    Setrefresh(!refresh);
                }
            })
    };

    const onChange = (pagination, filters, sorter, extra) => {
        if (sorter.order) {
            setOrder(sorter.order);
            if (sorter.field === 'key') {
                setField('id');
            }
            else {
                setField(sorter.field);
            }

        }
        else {
            setOrder('descend');
            setField('id');
        }
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

        // get Teams
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getTeam`)
            .then((res) => {
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    let val = {}
                    val.value = res.data[i].id;
                    val.label = res.data[i].team_name;
                    val.color = res.data[i].color;
                    temp.push(val)
                }
                console.log(temp)
                setTeam(temp)
            })
    }, []);

    useEffect(() => {
        var selectOption = []
        if (selectedCompany !== 'none') {
            selectOption.push({ name: 'company', value: selectedCompany })
        }
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/getAssets`,
                { current: current, perpage: perpage, search: search2, order: order, field: field, option: selectOption })
            .then((res) => {
                var temp = [];
                for (const i in res.data.data) {
                    temp[i] = res.data.data[i];
                    temp[i].key = parseInt(perpage * (current - 1)) + parseInt(i) + 1;
                    for (let k = 0; k < companies.length; k++) {
                        if (temp[i].company === companies[k].value) {
                            temp[i].company = companies[k].label
                        }
                    }
                    for (let k = 0; k < teams.length; k++) {
                        if (temp[i].assigned_team === teams[k].value) {
                            temp[i].assigned_team = teams[k].label
                            temp[i].team_color = teams[k].color
                        }
                    }
                }
                console.log(temp)
                setData(temp);
                setTotal(res.data.total);
            })
    }, [current, perpage, search2, order, field, refresh, selectedCompany, companies, teams]);

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
                        textTransform: 'uppercase',
                        fontSize: '23px',
                        fontWeight: 'bold',
                        background: '#E8F2F4',
                        padding: '10px',
                        mb: '20px'
                    }}>
                    All assets
                </Typography>

                <Box>
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

                    <Box className='toolbar'>
                        <FormControl sx={{ width: '100px', mb: '10px', mr: '10px' }} size="small">
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
                        <Box sx={{ flex: '1 1 0%', textAlign: { xs: 'let', lg: 'right' } }}>
                            <Input onChange={(e) => Setsearch(e.target.value)} onKeyPress={handlekeypress} size="large" placeholder="Search..." style={{ width: '200px', marginBottom: '10px', marginRight: '20px' }} />
                            <Button sx={{ mr: '20px', ml: { xs: '0px', lg: '20px', mb: '10px' }, mb: '10px' }} variant="outlined" startIcon={<UpgradeIcon />} endIcon={<KeyboardArrowDownIcon />}>
                                CSV import
                            </Button>
                            <Button
                                sx={{ mr: '20px', mb: '10px' }}
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

                            <Link to="/dashboard/assets/add" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" sx={{ mb: '10px' }}> ADD </Button>
                            </Link>
                        </Box>
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


import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, TimePicker, Checkbox, Select } from 'antd';
import { Button } from '@mui/material';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { Box, Card, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import moment from 'moment'
import { useParams } from "react-router-dom";
import Page from '../../../components/Page';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { PostcodeLookup } from "@ideal-postcodes/postcode-lookup";

const { TextArea } = Input;

const App = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const [data, SetData] = useState({});
    const [companies, setCompany] = useState([])
    const [teams, setTeam] = useState([])

    // Dialog
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

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
                setCompany(temp)
            })
        // get Team
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getTeam`)
            .then((res) => {
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    let val = {}
                    val.value = res.data[i].id;
                    val.label = res.data[i].team_name;
                    temp.push(val)
                }
                setTeam(temp)
            })
        PostcodeLookup.setup({
            context: "#lookup_field",
            apiKey: "iddqd",
            strictlyPostcodes: false,
            placeholder: "Search for a postcode or address",
            selectSinglePremise: true,
            outputFields: {
                line_1: "#first_line",
                line_2: "#second_line",
                line_3: "#third_line",
                post_town: "#post_town",
                postcode: "#postcode"
            },
        });
    }, []);
    const onFinish = (values) => {
        values.email = jwt_decode(localStorage.getItem('token')).email
        values.startdate = moment(values.startdate).format('YYYY-MM-DD')
        values.enddate = moment(values.enddate).format('YYYY-MM-DD')
        values.tags = JSON.stringify(values.tags)

        console.log('Success:', values);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/editjobs`, { id: data.job_id, value: values })
            .then((res) => {
                if (res.data.flag === 'success') {
                    setOpen(true);
                }
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/getjobByid`, { id: id })
            .then((res) => {
                SetData(res.data.data[0])
                var input = res.data.data[0];
                input.startdate = moment(input.startdate)
                input.enddate = moment(input.enddate)
                input.starttime = moment(input.starttime)
                input.tags = JSON.parse(input.tags)
                form.setFieldsValue(input);
                console.log(input)
            })
    }, []);

    return (
        <>
            <Page title="The Yorkshire Resin Company Ltd | Edit Job">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Stack direction="row" spacing={5} sx={{ mt: "20px" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", width: "150px" }}>
                            <CheckCircleOutlineIcon sx={{ mt: "20px", ml: "40px", mr: "20px", borderRadius: "10px", padding: "15px", background: "#eee", width: "70px", height: "70px" }} />
                        </Box>
                        <Box sx={{ m: "0px !important" }}>
                            <DialogTitle id="alert-dialog-title">
                                {"Job updated successfully!"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <Box>
                                        {/* Let Google help apps determine location. This means sending anonymous
                                        location data to Google, even when no apps are running. */}
                                    </Box>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant='outlined' onClick={handleClose} autoFocus>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Box>
                    </Stack>
                </Dialog>

                <Typography
                    color="text.primary"
                    sx={{
                        fontSize: '23px',
                        fontWeight: 'bold',
                        background: '#E8F2F4',
                        padding: '10px',
                        mb: '20px'
                    }}>
                    EDIT JOB
                </Typography>
                <Card>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <Container>
                            <Form
                                form={form}
                                name="basic"
                                layout="vertical"
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label="Select Company"
                                            name="company"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select company!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size='large'
                                                placeholder="Select a Company"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={companies}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Form.Item
                                            label="Title"
                                            name="title"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your title!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label="Tags"
                                            name="tags"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your title!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="tags"
                                                size="large"
                                                placeholder="Please select"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label="Start date of job"
                                            name="startdate"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input date!',
                                                },
                                            ]}
                                        >
                                            <DatePicker size="large" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label="Time Slot"
                                            name="starttime"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input time!',
                                                },
                                            ]}
                                        >
                                            <TimePicker size="large" format='HH:mm' style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label="End date of job"
                                            name="enddate"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input date!',
                                                },
                                            ]}
                                        >
                                            <DatePicker size="large" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label="Team"
                                            name="team"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input team!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                showSearch
                                                size="large"
                                                placeholder="Select a Team"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={teams}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>


                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                                    <Typography
                                        sx={{ pr: '20px' }}
                                        color="text.primary"
                                    >
                                        Planing Calendar
                                    </Typography>
                                    <Form.Item
                                        style={{ flex: '1 1 0%', paddingTop: '21px' }}
                                        name="tick"
                                        valuePropName="checked"
                                    >
                                        <Checkbox >
                                            Tick to add a new task to the planning calendar
                                        </Checkbox>
                                    </Form.Item>
                                </Stack>

                                <Form.Item
                                    label="Descriptions"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input description!',
                                        },
                                    ]}
                                >
                                    <TextArea rows={6} />
                                </Form.Item>

                                <Form.Item
                                    label="To Address"
                                >
                                    <Grid item xs={12} md={6} lg={12}>
                                        <div id="lookup_field" value="NR12 9DB 10"></div>
                                    </Grid>
                                    <Grid container spacing={3} sx={{ mt: '15px' }}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="address"
                                            >
                                                <Input id="first_line" size="large" placeholder='Address' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="address2"
                                            >
                                                <Input id="second_line" size="large" placeholder='Address2' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="address3"
                                            >
                                                <Input id="third_line" size="large" placeholder='Address3' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Input size="large" value='United Kingdom' />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3} >
                                            <Form.Item
                                                name="city"
                                            >
                                                <Input id="post_town" size="large" placeholder='City' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="countrystate"
                                            >
                                                <Input size="large" placeholder='Country/State' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="postcode"
                                            >
                                                <Input id="postcode" size="large" placeholder='Post Code' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                        </Grid>

                                        {/* 3 */}
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Referal"
                                                name="referal"
                                            >
                                                <Input size="large" placeholder='Referal' />
                                            </Form.Item>
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Responsible"
                                                name="responsible"
                                            >
                                                <Input size="large" placeholder='Responsible' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Priority"
                                                name="priority"
                                            >
                                                <Input size="large" placeholder='Priority' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="resin"
                                                valuePropName="checked"
                                            >
                                                <Checkbox style={{ marginTop: '37px' }}>Resin Customer</Checkbox>
                                            </Form.Item>
                                        </Grid>

                                    </Grid>
                                </Form.Item>

                                <Box sx={{ background: '#F3F1EB', padding: '25px', mb: '20px', borderRadius: '3px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="JOB VALUE"
                                                name="jobvalue"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your job value!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" placeholder='BRITISH POUND' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="CONTACT"
                                                name="contact"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your contact!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    size="large"
                                                    showSearch
                                                    placeholder="Select a Team"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    options={[
                                                        {
                                                            value: 'Everyone',
                                                            label: 'Everyone',
                                                        },
                                                        {
                                                            value: 'Accountant Only',
                                                            label: 'Accountant Only',
                                                        },
                                                        {
                                                            value: 'Management Only',
                                                            label: 'Management Only',
                                                        },
                                                        {
                                                            value: 'Sales Only',
                                                            label: 'Sales Only',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="INDIVIDUAL"
                                                name="individual"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your individual!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" />
                                            </Form.Item>
                                        </Grid>
                                    </Grid>
                                    <Form.Item
                                        name="tipping"
                                        valuePropName="checked"
                                    >
                                        {/* <FormControlLabel
                                            control={<Checkbox />}
                                            label="Tipping Stone Site"
                                        /> */}
                                        <Checkbox>Tipping Stone Site</Checkbox>
                                    </Form.Item>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Who can see this?"
                                                name="seeable"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your job value!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    size="large"
                                                    placeholder="Select a Team"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    options={[
                                                        {
                                                            value: 'Everyone',
                                                            label: 'Everyone',
                                                        },
                                                        {
                                                            value: 'Accountant Only',
                                                            label: 'Accountant Only',
                                                        },
                                                        {
                                                            value: 'Management Only',
                                                            label: 'Management Only',
                                                        },
                                                        {
                                                            value: 'Sales Only',
                                                            label: 'Sales Only',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16
                                    }}
                                    style={{ textAlign: 'right' }}
                                >
                                    <Button sx={{ mx: '15px' }} variant="contained" type="submit">
                                        Submit
                                    </Button>
                                    <Link to="/dashboard/jobs" style={{ textDecoration: 'none' }}>
                                        <Button variant="outlined">Cancel</Button>
                                    </Link>
                                </Form.Item>
                            </Form>
                        </Container>
                    </Box>
                </Card>
            </Page>
        </>
    );
};
export default App;
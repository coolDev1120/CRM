import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, TimePicker, Checkbox, Select, message } from 'antd';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Card, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import moment from 'moment'
import { useParams } from "react-router-dom";
import Page from '../../../components/Page';

const { TextArea } = Input;

const App = () => {
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const [data, SetData] = useState({});

    const onFinish = (values) => {
        values.email = jwt_decode(localStorage.getItem('token')).email
        values.startdate = moment(values.startdate).format('YYYY-MM-DD')
        values.enddate = moment(values.enddate).format('YYYY-MM-DD')
        values.tags = JSON.stringify(values.tags)

        console.log('Success:', values);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/editjobs`, { id: data.job_id, value: values })
            .then((res) => {
                message.config({ top: 100, duration: 5, });
                if (res.data.flag === 'success') {
                    setSuccess(true);
                    message.success(`You have successfully edited job.`);
                }
            })
            .catch((err) => {

            });
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
            })
    }, []);

    return (
        <>
            <Page title="The Yorkshire Resin Company Ltd | Edit Job">
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
                            {
                                success &&
                                <Stack sx={{ width: '100%', my: '15px' }} spacing={2}>
                                    <Alert severity="success">Success. You added job.</Alert>
                                </Stack>
                            }
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
                                            name="compnay"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input company!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Select a Team"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={[
                                                    {
                                                        value: 'jack',
                                                        label: 'Jack',
                                                    },
                                                    {
                                                        value: 'lucy',
                                                        label: 'Lucy',
                                                    },
                                                    {
                                                        value: 'tom',
                                                        label: 'Tom',
                                                    },
                                                ]}
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
                                            <Input />
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
                                                size="middle"
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
                                            <DatePicker style={{ width: '100%' }} />
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
                                            <TimePicker format='HH:mm' style={{ width: '100%' }} />
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
                                            <DatePicker style={{ width: '100%' }} />
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
                                                placeholder="Select a Team"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={[
                                                    {
                                                        value: 'jack',
                                                        label: 'Jack',
                                                    },
                                                    {
                                                        value: 'lucy',
                                                        label: 'Lucy',
                                                    },
                                                    {
                                                        value: 'tom',
                                                        label: 'Tom',
                                                    },
                                                ]}
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
                                    <TextArea rows={4} />
                                </Form.Item>

                                <Form.Item
                                    label="To Address"
                                >
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="address"
                                            >
                                                <Input placeholder='Address' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="address2"
                                            >
                                                <Input placeholder='Address2' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="address3"
                                            >
                                                <Input placeholder='Address3' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="country"
                                            >
                                                <Input placeholder='United Kingdom' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3} >
                                            <Form.Item
                                                name="city"
                                            >
                                                <Input placeholder='City' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="countrystate"
                                            >
                                                <Input placeholder='Country/State' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="postcode"
                                            >
                                                <Input placeholder='Post Code' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="findaddress"
                                            >
                                                <Input placeholder='Find Address' />
                                            </Form.Item>
                                        </Grid>

                                        {/* 3 */}
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Referal"
                                                name="referal"
                                            >
                                                <Input placeholder='Referal' />
                                            </Form.Item>
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Responsible"
                                                name="responsible"
                                            >
                                                <Input placeholder='Responsible' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Priority"
                                                name="priority"
                                            >
                                                <Input placeholder='Priority' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                name="resin"
                                                valuePropName="checked"
                                            >
                                                <Checkbox>Resin Customer</Checkbox>
                                            </Form.Item>
                                        </Grid>

                                    </Grid>
                                </Form.Item>

                                <Box sx={{ background: '#F3F1EB', padding: '25px', mx: '-25px', mb: '20px' }}>
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
                                                <Input placeholder='BRITISH POUND' />
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
                                                <Input />
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

                                {/* <Form.Item
                                    label="Responsible"
                                    name="responsible"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your responsible!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Quoted"
                                    name="quoted"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your quoted!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your category!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Status"
                                    name="status"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your status!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Status2"
                                    name="status2"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your status2!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item> */}

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
import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker } from 'antd';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Card, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Page from '../../../components/Page';


const App = () => {
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const [data, SetData] = useState({});

    const onFinish = (values) => {
        console.log('Success:', values);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/editjobs`, { id: data.job_id, value: values })
            .then((res) => {
                if (res.data.flag === 'success') {
                    setSuccess(true);
                }
            })
            .catch((err) => {
                console.log(err)
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/getjobByid`, { id: id })
            .then((res) => {
                console.log(res.data.data[0])
                SetData(res.data.data[0])
                form.setFieldsValue({
                    title: res.data.data[0].title,
                    contact: res.data.data[0].contact,
                    responsible: res.data.data[0].responsible,
                    quoted: res.data.data[0].quoted,
                    category: res.data.data[0].category,
                    status: res.data.data[0].status,
                    status2: res.data.data[0].status2,
                    postcode: res.data.data[0].postcode,
                    email: res.data.data[0].email,
                });
            })
            .catch((err) => {

            });
    }, []);

    return (
        <>
            <Page title="Edit Job">
                <Typography
                    color="text.primary"
                    sx={{
                        fontSize: '23px',
                        fontWeight: 'bold',
                        background: '#E8F2F4',
                        padding: '10px',
                        mb: '20px'
                    }}>
                    Add Job
                </Typography>
                <Card>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <Container>
                            {
                                success &&
                                <Stack sx={{ width: '100%', my: '15px' }} spacing={2}>
                                    <Alert severity="success">Success. You have edited job.</Alert>
                                </Stack>
                            }
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                    title: data.title
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
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

                                <Form.Item
                                    label="Contact"
                                    name="contact"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your contact!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
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
                                    label="Start Date"
                                    name="startdate"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your startdate!',
                                        },
                                    ]}
                                >
                                    <DatePicker defaultValue={data.startdate} style={{ width: '100%' }} />
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
                                </Form.Item>


                                <Form.Item
                                    label="Postcode"
                                    name="postcode"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your postcode!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

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
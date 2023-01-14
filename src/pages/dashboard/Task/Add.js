import React, { useState } from 'react';
import { Form, Input, Select, message, Switch } from 'antd';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Card, Container, Typography, Grid } from '@mui/material';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Page from '../../../components/Page';
const { Option } = Select;

const { TextArea } = Input;

const App = () => {
    const [success, setSuccess] = useState(false);

    const onFinish = (values) => {
        values.email = jwt_decode(localStorage.getItem('token')).email
        values.responsible = JSON.stringify(values.responsible)
        if (!values.importantce) { values.importantce = false }

        console.log('Success:', values);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/addtask`, values)
            .then((res) => {
                message.config({ top: 100, duration: 5, });
                if (res.data.flag === 'success') {
                    setSuccess(true);
                    message.success(`You have successfully added new task.`);
                }
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Page title="The Yorkshire Resin Company Ltd | Add New Task">
                <Typography
                    color="text.primary"
                    sx={{
                        fontSize: '23px',
                        fontWeight: 'bold',
                        background: '#E8F2F4',
                        padding: '10px',
                        mb: '20px'
                    }}>
                    ADD NEW TASK
                </Typography>
                <Card>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <Container>
                            {
                                success &&
                                <Stack sx={{ width: '100%', my: '15px' }} spacing={2}>
                                    <Alert severity="success">Success. You added task.</Alert>
                                </Stack>
                            }
                            <Form
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
                                            name="company"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input company!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Select Company"
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
                                            label="Task Details"
                                            name="description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input detail!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Form.Item
                                            label="When to do it?"
                                            name="date"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input description!',
                                                },
                                            ]}
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Form.Item
                                            label="Responsible (Select all / Select none)"
                                            name="responsible"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input responsible!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="multiple"
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Select"
                                                optionLabelProp="label"
                                            >
                                                <Option value="Astjin">
                                                    Astjin
                                                </Option>
                                                <Option value="Michale">
                                                    Michale
                                                </Option>
                                                <Option value="Jhon">
                                                    Jhon
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Form.Item
                                    layout="horizontal"
                                    label="High Importantce"
                                    name="importantce"
                                >
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    style={{ textAlign: 'left' }}
                                >
                                    <Button sx={{ mx: '15px' }} variant="contained" type="submit">
                                        Submit
                                    </Button>
                                    <Link to="/task/jobs" style={{ textDecoration: 'none' }}>
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
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, message, Switch } from 'antd';
import { Button } from '@mui/material';
import axios from 'axios';
import { Box, Card, Container, Typography, Grid } from '@mui/material';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useParams } from "react-router-dom";
import Page from '../../../components/Page';
const { Option } = Select;

const { TextArea } = Input;

const App = () => {
    const [form] = Form.useForm();
    const [companies, setCompany] = useState([]);
    const { id } = useParams();

    const onFinish = (values) => {
        values.email = jwt_decode(localStorage.getItem('token')).email
        values.responsible = JSON.stringify(values.responsible)
        if (!values.importance) { values.importance = false }
        console.log(values)

        console.log('Success:', values);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/edittask`, { id: id, value: values })
            .then((res) => {
                message.config({ top: 100, duration: 5, });
                if (res.data.flag === 'success') {
                    message.success(`You have successfully edited new task.`);
                }
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
    }, []);

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/gettaskByid`, { id: id })
            .then((res) => {
                console.log(res.data.data[0])
                var input = res.data.data[0];
                input.responsible = JSON.parse(input.responsible)
                form.setFieldsValue(input);
            })
    }, []);

    return (
        <>
            <Page title="The Yorkshire Resin Company Ltd | Edit New Task">
                <Typography
                    color="text.primary"
                    sx={{
                        fontSize: '23px',
                        fontWeight: 'bold',
                        background: '#E8F2F4',
                        padding: '10px',
                        mb: '20px'
                    }}>
                    Edit TASK
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
                                                size='large'
                                                placeholder="Select Company"
                                                optionFilterProp="children"
                                                options={companies}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Form.Item
                                            label="Task Details"
                                            name="taskdetail"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input detail!',
                                                },
                                            ]}
                                        >
                                            <Input size='large' />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Form.Item
                                            label="When to do it?"
                                            name="description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input description!',
                                                },
                                            ]}
                                        >
                                            <TextArea rows={5} />
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
                                                size='large'
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
                                    name="importance"
                                    valuePropName="checked"
                                >
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button sx={{ mr: '15px' }} variant="contained" type="submit">
                                        Submit
                                    </Button>
                                    <Link to="/dashboard/task" style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" className='btn_cancel'>Cancel</Button>
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
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, message, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Card, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import Page from '../../../components/Page';

const { TextArea } = Input;

const App = () => {
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);
    const [companies, setCompany] = useState([]);
    const [categories, setCategory] = useState([]);
    const [subcategories, setSubcategory] = useState([]);
    const [sub2categories, setSub2category] = useState([]);
    const { id } = useParams();
    const [data, SetData] = useState({});
    

    const onFinish = (values) => {
        values.email = jwt_decode(localStorage.getItem('token')).email
        values.tags = JSON.stringify(values.tags)
        if (!values.consumable) { values.consumable = false }
        if (!values.vatprice) { values.vatprice = false }

        console.log('Success:', values);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/editmaterial`, { id: data.material_id, value: values })
            .then((res) => {
                message.config({ top: 100, duration: 5, });
                if (res.data.flag === 'success') {
                    setSuccess(true);
                    message.success(`You have successfully modified material.`);
                }
            })
            .catch((err) => {

            });
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
                console.log(temp)
                setCompany(temp)
            })
        // get Cetegories
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getCategory`)
            .then((res) => {
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    let val = {}
                    val.value = res.data[i].id;
                    val.label = res.data[i].category_name;
                    temp.push(val)
                }
                console.log(temp)
                setCategory(temp)
            })
        // get Subcategories
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getSubCategory`)
            .then((res) => {
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    let val = {}
                    val.value = res.data[i].id;
                    val.label = res.data[i].subcategory_name;
                    temp.push(val)
                }
                console.log(temp)
                setSubcategory(temp)
            })
        // get Sub2categories
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getSub2Category`)
            .then((res) => {
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    let val = {}
                    val.value = res.data[i].id;
                    val.label = res.data[i].sub2category_name;
                    temp.push(val)
                }
                console.log(temp)
                setSub2category(temp)
            })
    }, []);
    
    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/getmaterialByid`, { id: id })
            .then((res) => {
                console.log(res.data.data[0])
                SetData(res.data.data[0])
                var input = res.data.data[0];
                input.tags = JSON.parse(input.tags)
                form.setFieldsValue(res.data.data[0]);
            })
    }, []);

    return (
        <>
            <Page title="The Yorkshire Resin Company Ltd | Edit New Matrial">
                <Typography
                    color="text.primary"
                    sx={{
                        fontSize: '23px',
                        fontWeight: 'bold',
                        background: '#E8F2F4',
                        padding: '10px',
                        mb: '20px'
                    }}>
                    Edit NEW MATRIAL
                </Typography>
                <Card>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <Container>
                            {
                                success &&
                                <Stack sx={{ width: '100%', my: '15px' }} spacing={2}>
                                    <Alert severity="success">Success. You edited job.</Alert>
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
                                            name="company"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input company!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                showSearch
                                                placeholder="Select Company"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={companies}
                                            />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            name="category"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input category!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                placeholder="Select Category"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={categories}
                                            />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            name="subcategory"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input sub-category!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                placeholder="Select sub-category"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={subcategories}
                                            />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            name="subsubcategory"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input sub-sub-category!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                placeholder="Select sub-sub-category"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={sub2categories}
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
                                                    message: 'Please input tags!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                mode="tags"
                                                placeholder="Please select"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label="Consumable"
                                            name="consumable"
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

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
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Form.Item
                                                label="Quantity"
                                                name="quantity"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input quantity!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Form.Item
                                                label="Minimum quantity"
                                                name="mquantity"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input minimum  quantity!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" />
                                            </Form.Item>
                                        </Grid>
                                    </Grid>
                                </Form.Item>

                                <Box sx={{ background: '#F3F1EB', padding: '25px', mb: '20px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Purchase Price"
                                            >
                                                <Input size="large" value='BRITISH POUND' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label=" "
                                                name="purchaseprice"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input price!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" placeholder='ENTER PRICE' />
                                            </Form.Item>
                                        </Grid>
                                    </Grid>

                                    <Form.Item
                                        label="Purchase Price inc VAT"
                                        name="vatprice"
                                        valuePropName="checked"
                                    >
                                        <Switch
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                        />
                                    </Form.Item>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Sale Price"
                                            >
                                                <Input size="large" value='BRITISH POUND' />
                                            </Form.Item>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label=" "
                                                name="saleprice"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input sale price!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" placeholder='ENTER PRICE' />
                                            </Form.Item>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Contact Details"
                                                name="contactdetail"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input contact detail!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" />
                                            </Form.Item>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <Form.Item
                                                label="Individuals"
                                                name="individual"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input individuals!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" />
                                            </Form.Item>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 16
                                    }}
                                >
                                    <Button sx={{ mr: '15px' }} variant="contained" type="submit">
                                        Submit
                                    </Button>
                                    <Link to="/dashboard/materials" style={{ textDecoration: 'none' }}>
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
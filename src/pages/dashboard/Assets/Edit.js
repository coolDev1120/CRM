/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, message, Switch, DatePicker, } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { Box, Card, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Page from '../../../components/Page';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CloudUploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useParams } from "react-router-dom";
import { Upload } from 'antd'
const { Dragger } = Upload;

const suffix = (
    <div
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    >£</div>
);

const { TextArea } = Input;

const App = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const [data, SetData] = useState({});
    const [team, setTeam] = useState([]);
    const [company, setCompany] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [image, setImage] = useState("");

    // Dialog
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getTeam`)
            .then((res) => {
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    let val = {}
                    val.value = res.data[i].id;
                    val.label = res.data[i].team_name;
                    temp.push(val)
                }
                console.log(temp)
                setTeam(temp)
            })
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
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getCategory`)
            .then((res) => {
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    let val = {}
                    val.value = res.data[i].id;
                    val.label = res.data[i].category_name;
                    temp.push(val)
                }
                setCategory(temp)
            })
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getSubCategory`)
            .then((res) => {
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    let val = {}
                    val.value = res.data[i].id;
                    val.label = res.data[i].subcategory_name;
                    temp.push(val)
                }
                setSubCategory(temp)
            })
        axios.post(`${process.env.REACT_APP_SERVER_URL}/getAssetsByid`, { id: id })
            .then((res) => {
                SetData(res.data)
                setImage(res.data.data[0].image)
                console.log(res.data.data[0])
                var input = res.data.data[0];
                input.purchased_date = (moment(input.purchased_date))
                input.service_date = moment(input.service_date)
                console.log(input)
                form.setFieldsValue(input);
            })
    }, []);

    const onFinish = (values) => {
        values.email = jwt_decode(localStorage.getItem('token')).email
        if (!values.service_required) { values.service_required = false }
        if (!values.set_reminders) { values.set_reminders = false }
        values.purchased_date = moment(values.purchased_date).format("YYYY-MM-DD")
        values.service_date = moment(values.service_date).format("YYYY-MM-DD")
        values.image = image

        console.log('Success:', values);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/editAssets`, { id: data.data[0].id, value: values })
            .then((res) => {
                message.config({ top: 100, duration: 5, });
                if (res.data.flag === 'success') {
                    setOpen(true);
                }
            })
            .catch((err) => {

            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const props = {
        name: 'photo',
        multiple: false,
        action: `${process.env.REACT_APP_SERVER_URL}/uploadimage`,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
            }
            if (status === 'done') {
                setImage(info.file.response.success)
                console.log(info.file.response.success)
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <>
            <Page title="The Yorkshire Resin Company Ltd | Edit New Contact">
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
                                {"Asset updated successfully!"}
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
                        textTransform: 'uppercase',
                        fontSize: '23px',
                        fontWeight: 'bold',
                        background: '#E8F2F4',
                        padding: '10px',
                        mb: '20px'
                    }}>
                    Edit NEW assets
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
                                                size="large"
                                                showSearch
                                                placeholder="Select Company"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={company}
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
                                                showSearch
                                                placeholder="Select Category"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={category}
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
                                                showSearch
                                                placeholder="Select sub-category"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={subCategory}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            name="assets_type"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select assets type!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                showSearch
                                                placeholder="ASSETS TYPES"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={[
                                                    {
                                                        value: 'Documents',
                                                        label: 'Documents',
                                                    },
                                                    {
                                                        value: 'Certificates',
                                                        label: 'Certificates',
                                                    },
                                                    {
                                                        value: 'Invoices',
                                                        label: 'Invoices',
                                                    }
                                                ]}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="ASSETS NAME"
                                            name="assets_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your assets name!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="ASSETS VALUE"
                                            name="assets_value"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input assets value!',
                                                },
                                            ]}
                                        >
                                            <Input prefix={suffix} size="large" />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="PURCHASED DATE"
                                            name="purchased_date"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input assgined team!',
                                                },
                                            ]}
                                        >
                                            <DatePicker size='large' style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="ASSIGNED TEAM"
                                            name="assigned_team"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input !',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                showSearch
                                                optionFilterProp="children"
                                                options={team}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" >
                                            <Typography
                                                sx={{ pr: '20px', mt: '10px' }}
                                                color="text.primary"
                                            >
                                                SERVICE REQUIRED
                                            </Typography>
                                            <Form.Item
                                                label=" "
                                                style={{ flex: '1 1 0%' }}
                                                name="service_required"
                                                valuePropName="checked"
                                            >
                                                <Switch
                                                    checkedChildren={<CheckOutlined />}
                                                    unCheckedChildren={<CloseOutlined />}
                                                />
                                            </Form.Item>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="SERVICE DATE"
                                            name="service_date"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select service date!',
                                                },
                                            ]}
                                        >
                                            <DatePicker size='large' style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="SET REMINDERS"
                                            name="set_reminders"
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Form.Item
                                            label=" ADDTIONAL DETAILS"
                                            name="additional_details"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input text!',
                                                },
                                            ]}
                                        >
                                            <TextArea rows={6} />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                {data.data &&
                                    <a target="blank" href={`${process.env.REACT_APP_SERVER_URL}/` + image}>{image}</a>
                                }

                                <Grid container spacing={3} sx={{ mt: '10px', mb: '40px' }}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Dragger  {...props} style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                            <CloudUploadOutlined style={{ color: '#796610', fontSize: '30px' }} />
                                            <p className="ant-upload-text p-3">Drag and drop a file to upload</p>
                                        </Dragger>
                                    </Grid>
                                </Grid>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 16
                                    }}
                                >
                                    <Button sx={{ mr: '15px' }} variant="contained" type="submit">
                                        Submit
                                    </Button>
                                    <Link to="/dashboard/assets" style={{ textDecoration: 'none' }}>
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
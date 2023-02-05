import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Card, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Page from '../../../components/Page';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useParams } from "react-router-dom";
import { PostcodeLookup } from "@ideal-postcodes/postcode-lookup";
import $ from 'jquery'
import "./style.css"
const { TextArea } = Input;

const App = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const [data, SetData] = useState({});
    const [company, setCompany] = useState([]);
    const [category1, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    // Dialog
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
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

        axios.post(`${process.env.REACT_APP_SERVER_URL}/getContactByid`, { id: id })
            .then((res) => {
                SetData(res.data)
                console.log(res.data.data[0])
                form.setFieldsValue(res.data.data[0]);
            })

        setTimeout(() => {
            $("#lookup_field input").addClass('ant-input ant-input-lg css-dev-only-do-not-override-k83k30')
            $("#lookup_field button").addClass('MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root css-hn3hub-MuiButtonBase-root-MuiButton-root')
            $("#lookup_field select").addClass('ant-select-selector')
            console.log(12312321321)
        }, 1000);
    }, []);

    const onFinish = (values) => {
        if (!values.automated_email) { values.automated_email = false }
        console.log('Success:', values);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/editContact`, { id: data.data[0].id, value: values })
            .then((res) => {
                if (res.data.flag === 'success') {
                    setOpen(true);
                }
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Page title="The Yorkshire Resin Company Ltd | Edit Contact">
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
                                {"User updated successfully!"}
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
                    EDIT CONTACT
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
                                                options={category1}
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
                                                options={subCategory}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="Customer Name"
                                            name="customer_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your customer name!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    required: true,
                                                    message: 'Please input email!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="Phone"
                                            name="phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input phone!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="Landline#"
                                            name="landline"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your customer landline!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="Other Contact #"
                                            name="other_contact"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input other contact!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            label="Website"
                                            name="website"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input website!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={12}>
                                        <Form.Item
                                            label="Address"
                                        >
                                            <div id="lookup_field" value="NR12 9DB 10"></div>
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Form.Item
                                            name="address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your customer Address!',
                                                },
                                            ]}
                                        >
                                            <Input id="first_line" placeholder='address' size="large" />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Form.Item
                                            name="house"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input other house!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" placeholder='House #' />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            name="city"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your customer city!',
                                                },
                                            ]}
                                        >
                                            <Input id="post_town" size="large" placeholder='City' />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            name="country_state"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input other contact!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" placeholder='Country / State' />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Form.Item
                                            name="postcode"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input postcode!',
                                                },
                                            ]}>
                                            <Input id="postcode" size="large" placeholder='Postcode Look Up' />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={5}>
                                        <Form.Item
                                            label="How did yoy hear about us?"
                                            name="where_find"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select one!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={[
                                                    {
                                                        value: 'Indeed',
                                                        label: 'Indeed',
                                                    },
                                                    {
                                                        value: 'Linkedin',
                                                        label: 'Linkedin',
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Form.Item
                                            label="About"
                                            name="about"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input text!',
                                                },
                                            ]}
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label="Social"
                                            name="twitter_username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your customer city!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" placeholder='Twitter Username' />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label=" "
                                            name="facebook_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input other facebook id!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" placeholder='Facebook ID' />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label=" "
                                            name="linkedin_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input other linked id!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" placeholder='Linkedin ID' />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Form.Item
                                            label=" "
                                            name="skype_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input other skype name!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" placeholder='Skype Name' />
                                        </Form.Item>
                                    </Grid>
                                </Grid>

                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                                    <Typography
                                        sx={{ pr: '20px' }}
                                        color="text.primary"
                                    >
                                        Do you want to receive antomated emails?
                                    </Typography>
                                    <Form.Item
                                        style={{ flex: '1 1 0%', paddingTop: '21px' }}
                                        name="automated_email"
                                        valuePropName="checked"
                                    >
                                        <Switch
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                        />
                                    </Form.Item>
                                </Stack>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 16
                                    }}
                                >
                                    <Button sx={{ mr: '15px' }} variant="contained" type="submit">
                                        Submit
                                    </Button>
                                    <Link to="/dashboard/contact" style={{ textDecoration: 'none' }}>
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
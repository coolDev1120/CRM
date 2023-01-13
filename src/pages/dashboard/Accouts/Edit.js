import React, { useEffect } from 'react';
import { Typography, Button, Container } from '@mui/material';
import { Form, Input, Select, DatePicker, message } from 'antd';
import { Link } from 'react-router-dom';
import { Colorpicker } from 'antd-colorpicker'
import moment from 'moment'
import { useParams } from "react-router-dom";
import axios from 'axios';

import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';

import Page from '../../../components/Page';
const { Option } = Select;

const PageTitle = styled('div')(({ theme }) => ({
	backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
}));



export default function EcommerceProductList() {
	const [form] = Form.useForm();
	const { id } = useParams();

	const onFinish = (values) => {
		values.dateAdded = moment(values.dateAdded).format('YYYY-MM-DD')
		values.colourCode = values.colourCode.hex;
		console.log(values)
		if (values.password && !values.confirm) {
			message.config({ top: 100, duration: 5, });
			message.error(`Type your password only if you want to change it.`);
			return;
		}

		axios.post(`${process.env.REACT_APP_SERVER_URL}/updateAccountById`, values)
			.then((res) => {
				console.log(res.data)
				message.config({ top: 100, duration: 5, });
				if (res.data.flag === "success") {
					message.success(`You have successfully modified your account.`);
				}
				else if (res.data.flag === 'failed') {
					message.error(res.data.message);
				}
			})
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		axios.post(`${process.env.REACT_APP_SERVER_URL}/getAccountById`, { id: id })
			.then((res) => {
				console.log(res.data)
				form.setFieldsValue({
					team: res.data.data[0].team,
					username: res.data.data[0].username,
					email: res.data.data[0].email,
					phone: res.data.data[0].phone,
					accountype: res.data.data[0].accountype,
					colourCode: res.data.data[0].colourCode,
					staff: res.data.data[0].staff,
					dateAdded: moment(res.data.data[0].dateAdded),
					permissions: res.data.data[0].permissions,
				});
			})
	}, []);

	return (
		<>
			<Page title="The Yorkshire Resin Company Ltd | Edit Acccount">
				<PageTitle>
					<Typography
						color="text.primary"
						sx={{
							fontSize: '23px',
							fontWeight: 'bold',
							padding: '10px',
							mb: '20px'
						}}>
						Edit Acccount
					</Typography>
				</PageTitle>
				<Box>
					<Container>
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
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
						>

							<Form.Item
								label="Account Type"
								name="accountype"
								rules={[
									{
										required: true,
										message: 'Please input full name!',
									},
								]}
							>
								<Select placeholder="Select team">
									<Option value="User">User</Option>
									<Option value="team">Team</Option>
								</Select>
							</Form.Item>

							<Form.Item
								label="Full Name"
								name="username"
								rules={[
									{
										required: true,
										message: 'Please input full name!',
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
										message: 'Please input email!',
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="Mobile"
								name="phone"
								rules={[
									{
										required: true,
										message: 'Please input mobile number!',
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								name="password"
								label="Password"
								hasFeedback
							>
								<Input.Password />
							</Form.Item>

							<Form.Item
								name="confirm"
								label="Confirm Password"
								dependencies={['password']}
								hasFeedback
								rules={[
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(new Error('The two passwords that you entered do not match!'));
										},
									}),
								]}
							>
								<Input.Password />
							</Form.Item>

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
								<Select placeholder="Select team">
									<Option value="User">User</Option>
									<Option value="team">Team</Option>
								</Select>
							</Form.Item>

							{/* <Form.Item
								label="Email Signature"
								name="emailSignature"
								rules={[
									{
										required: true,
										message: 'Please input email signature!',
									},
								]}
							>
								<Input />
							</Form.Item> */}

							<Form.Item
								label="Colour Code"
								name="colourCode"
								rules={[
									{
										required: true,
										message: 'Please input colour code!',
									},
								]}
							>
								{/* https://betterprogramming.pub/add-colorpicker-to-ant-design-form-50b26bec38f1 */}
								<Colorpicker
									// popup
									picker={'CirclePicker'}
								/>
							</Form.Item>

							<Form.Item
								label="Staff"
								name="staff"
								rules={[
									{
										required: true,
										message: 'Please input staff!',
									},
								]}
							>
								<Select placeholder="Select staff">
									<Option value="yes">Yes</Option>
									<Option value="no">No</Option>
								</Select>
							</Form.Item>

							<Form.Item
								label="Date Added"
								name="dateAdded"
								rules={[
									{
										required: true,
										message: 'Please input date added!',
									},
								]}
							>
								<DatePicker />
							</Form.Item>

							<Form.Item
								label="Permissions"
								name="permissions"
								rules={[
									{
										required: true,
										message: 'Please input permissions!',
									},
								]}
							>
								<Select placeholder="Select team">
									<Option value="accountant">Accountant</Option>
									<Option value="management">Management</Option>
									<Option value="sales">Sales</Option>
									<Option value="works">Works</Option>
								</Select>
							</Form.Item>

							{/* <Form.Item
								label="Signature"
								name="signature"
								rules={[
									{
										required: true,
										message: 'Please input signature!',
									},
								]}
							>
								<Input />
							</Form.Item> */}

							<Form.Item
								wrapperCol={{
									offset: 8,
									span: 16,
								}}
							>
								<Button sx={{ mx: '15px' }} variant='contained' type="submit">
									Update
								</Button>
								<Link to="/dashboard/accounts">
									<Button variant='outlined'>Cancel</Button>
								</Link>
							</Form.Item>
						</Form>
					</Container>
				</Box>

			</Page>
		</>
	);
}


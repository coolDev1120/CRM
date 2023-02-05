/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import { CloudUploadOutlined } from '@ant-design/icons';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import axios from 'axios'
// material
import { Box, Grid, Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------

import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop';
const { Dragger } = Upload;

export default function AccountGeneral() {
	const { enqueueSnackbar } = useSnackbar();
	const [username, setUsername] = useState("");
	const [image, setImage] = useState("");

	const UpdateUserSchema = Yup.object().shape({
		displayName: Yup.string().required('Name is required')
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			displayName: username,
			email: jwt_decode(localStorage.getItem('token')).email,
			image: image,
		},
		validationSchema: UpdateUserSchema,
		onSubmit: async (values) => {
			console.log(values)
			axios
				.post(`${process.env.REACT_APP_SERVER_URL}/setting/updateAccount`, values)
				.then((res) => {
					if (res.data.flag === "success") {
						enqueueSnackbar('Update success. To see the updated infomation, please try login again.', { variant: 'success' });
						localStorage.setItem('token', res.data.token)
					}
				})
		}
	});

	const { isSubmitting, handleSubmit, getFieldProps } = formik;

	// Upload
	useEffect(() => {
		axios.post(`${process.env.REACT_APP_SERVER_URL}/setting/getAccount`, { email: jwt_decode(localStorage.getItem('token')).email })
			.then(res => {
				setUsername(res.data.data.username)
				setImage(res.data.data.image)
			})
	}, []);

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
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={4}>
						<Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
							<div className="form-group pb-5">
								<div className='flex  mt-2' >
									<Box sx={{ display: 'flex', justifyContent: 'center' }}>
										<img className='mr-3 rounded-lg'
											style={{ width: "160px", height: "160px", border: '1px solid #eee', borderRadius: '100%', marginTop: '10px', marginBottom: '10px', padding: '10px' }}
											src={`${process.env.REACT_APP_SERVER_URL}/` + image} />
									</Box>
									<ImgCrop rotate>
										<Dragger  {...props}>
											<div>
												<CloudUploadOutlined style={{ color: '#796610', fontSize: '30px' }} />
												<p className="ant-upload-text p-3">Click or drag file to this area to upload</p>
											</div>
										</Dragger>
									</ImgCrop>
								</div>
							</div>
						</Card>
					</Grid>

					<Grid item xs={12} md={8}>
						<Card sx={{ p: 3 }}>
							<TextField fullWidth label="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
							<TextField sx={{ my: '20px' }} fullWidth disabled label="Email Address" {...getFieldProps('email')} />

							<Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
								<LoadingButton type="submit" variant="contained" loading={isSubmitting}>
									Save Changes
								</LoadingButton>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	);
}

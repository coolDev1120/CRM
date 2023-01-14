import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import axios from 'axios'
// material
import { Box, Grid, Card, TextField, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from '../../../../utils/formatNumber';
//
// import countries from '../countries';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
	const { enqueueSnackbar } = useSnackbar();

	const UpdateUserSchema = Yup.object().shape({
		displayName: Yup.string().required('Name is required')
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			displayName: jwt_decode(localStorage.getItem('token')).name,
			email: jwt_decode(localStorage.getItem('token')).email,
			photoURL: jwt_decode(localStorage.getItem('token')).image,
			phoneNumber: '',
			country: 'user.country',
			address: 'user.address',
			state: 'user.state',
			city: 'user.city',
			zipCode: 'user.zipCode',
			about: 'user.about',
			isPublic: 'user.isPublic'
		},

		validationSchema: UpdateUserSchema,
		onSubmit: async (values) => {
			console.log(values)
			axios
				.post(`${process.env.REACT_APP_SERVER_URL}/setting/updateAccount`, values)
				.then((res) => {
					if (res.data.flag === "success") {
						enqueueSnackbar('Update success. To see the updated infomation, please try login again.', { variant: 'success' });
					}
				})
				.catch((err) => {

				});
			// try {
			// 	await updateProfile({ ...values });
			// 	enqueueSnackbar('Update success', { variant: 'success' });
			// 	if (isMountedRef.current) {
			// 		setSubmitting(false);
			// 	}
			// } catch (error) {
			// 	if (isMountedRef.current) {
			// 		setErrors({ afterSubmit: error.code });
			// 		setSubmitting(false);
			// 	}
			// }
		}
	});

	const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setFieldValue('photoURL', {
					...file,
					preview: URL.createObjectURL(file)
				});
			}
		},
		[setFieldValue]
	);

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={4}>
						<Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
							<UploadAvatar
								accept="image/*"
								file={values.photoURL}
								maxSize={3145728}
								onDrop={handleDrop}
								error={Boolean(touched.photoURL && errors.photoURL)}
								caption={
									<Typography
										variant="caption"
										sx={{
											mt: 2,
											mx: 'auto',
											display: 'block',
											textAlign: 'center',
											color: 'text.secondary'
										}}
									>
										Allowed *.jpeg, *.jpg, *.png, *.gif
										<br /> max size of {fData(3145728)}
									</Typography>
								}
							/>

							<FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
								{touched.photoURL && errors.photoURL}
							</FormHelperText>
						</Card>
					</Grid>

					<Grid item xs={12} md={8}>
						<Card sx={{ p: 3 }}>
							<TextField fullWidth label="Name" {...getFieldProps('displayName')} />
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

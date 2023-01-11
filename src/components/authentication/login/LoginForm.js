import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, Alert, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors }) => {
      console.log(values);
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/signin`, { email: values.email, password: values.password })
        .then((res) => {
          console.log(111);
          console.log(res.data.flag);
          if (res.data.flag === 'success') {
            localStorage.setItem('token', res.data.token);
            window.location = '/dashboard/index';
          } else {
            setErrors({ afterSubmit: res.data.error });
          }
        })
        .catch((err) => {
          setErrors({ afterSubmit: err });
        });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Keep me Signed In"
            sx={{ color: "#9B7E4A" }}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ backgroundColor: "#9B7E4A" }}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

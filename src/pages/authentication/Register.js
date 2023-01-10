/* eslint-disable jsx-a11y/alt-text */
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { RegisterForm } from '../../components/authentication/register';
import AuthFirebaseSocials from '../../components/authentication/AuthFirebaseSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  return (
    <RootStyle title="Register" sx={{ background: '#bda06c' }}>
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
          Login
        </Link>
      </AuthLayout>

      <Container>
        <ContentStyle>
          <Card sx={{ display: 'flex' }}>
            <img src="/static/mock-images/products/login.png" />
            <div style={{ padding: '35px' }}>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Please enter your infomation.
                  </Typography>
                </Box>
              </Box>

              {method === 'firebase' && <AuthFirebaseSocials />}

              <RegisterForm />

              <MHidden width="smUp">
                <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?&nbsp;
                  <Link to={PATH_AUTH.login} component={RouterLink}>
                    Login
                  </Link>
                </Typography>
              </MHidden>
            </div>
          </Card>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

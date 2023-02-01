/* eslint-disable jsx-a11y/alt-text */
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';

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

export default function Login() {

  return (
    <>
      <RootStyle title="Login" sx={{ background: '#bda06c' }}>
        <AuthLayout>
          Don’t have an account? &nbsp;
          <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
            Get started
          </Link>
        </AuthLayout>


        <Container sx={{ maxWidth: '600px' }}>
          <ContentStyle>
            <Card sx={{ display: 'flex' }}>
              <MHidden width="mdDown">
                <img src="/static/mock-images/products/login.png" />
              </MHidden>
              <div style={{ padding: '35px', width: '100%' }}>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      Please enter your <b>email</b> and <b>password</b>.
                    </Typography>
                  </Box>
                </Stack>

                <LoginForm />

                <Box sx={{ align: 'center', mt: '15px' }}>
                  <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword} sx={{ color: "#9B7E4A" }}>
                    Forgot password?
                  </Link>
                </Box>

                <MHidden width="smUp">
                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don’t have an account?&nbsp;
                    <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                      Get started
                    </Link>
                  </Typography>
                </MHidden>
              </div>
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}

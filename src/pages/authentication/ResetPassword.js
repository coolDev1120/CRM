/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ResetPasswordForm } from '../../components/authentication/reset-password';
import { MHidden } from '../../components/@material-extend';
//
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
  background: '#BDA06C'
}));

const FormStyle = styled(Page)(({ theme }) => ({
  border: '8px solid #fff',
}));

const InnerBorder = styled(Page)(({ theme }) => ({
  border: '10px solid',
  padding: '20px 70px',
  borderColor: '#BDA06C',
  background: '#fff'
}));


// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);


  return (
    <RootStyle title="Reset Password">
      <LogoOnlyLayout />

      {/* <Container> */}
      <FormStyle>
        <InnerBorder>
          <Box sx={{ maxWidth: 480 }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
                  Recover password
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5, textAlign: 'center' }}>
                  Enter your Email and instructions will be sent to you!
                </Typography>

                <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                  Back
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a confirmation email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>

                <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5, backgroundColor: "#9B7E4A" }} >
                  Back
                </Button>
              </Box>
            )}
          </Box>
        </InnerBorder>
      </FormStyle>

      {/* </Container> */}
      <MHidden width="smDown">
        <Box sx={{ position: 'fixed', bottom: "10px", background: "#fff", width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img style={{ maxHeight: '150px', padding: '20px' }} src='/static/auth/btm_1.png' />
          <img style={{ maxHeight: '150px', padding: '20px' }} src='/static/auth/btm_2.png' />
        </Box>
      </MHidden>
    </RootStyle>
  );
}

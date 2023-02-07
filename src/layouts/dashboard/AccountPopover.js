import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
// components
import { MIconButton } from '../../components/@material-extend';
import MyAvatar from '../../components/MyAvatar';
import MenuPopover from '../../components/MenuPopover';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Accounts',
    icon: personFill,
    linkTo: '/dashboard/accounts'
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: PATH_DASHBOARD.user.account
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    // eslint-disable-next-line no-restricted-globals
    navigate('/auth/login')
  };

  // Dialog
  const [dialog, setDialog] = useState(false);

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  return (
    <>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textAlign: 'center' }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Sure you want to Log Out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to accept this?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='outlined' onClick={handleCloseDialog} autoFocus>No, cancel</Button>
          <Button variant='contained' onClick={handleLogout}>Yes, confirm</Button>
        </DialogActions>
      </Dialog>
      
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <MyAvatar />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {jwt_decode(localStorage.getItem('token')).name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {jwt_decode(localStorage.getItem('token')).email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleClickOpen}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

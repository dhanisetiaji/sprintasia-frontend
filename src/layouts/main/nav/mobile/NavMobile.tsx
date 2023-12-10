import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { List, Drawer, IconButton, Divider, Box, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';
import { PATH_AUTH } from 'src/routes/paths';
import { useDispatch } from 'src/redux/store';

// config
import { NAV } from '../../../../config-global';
// components
import Logo from '../../../../components/logo';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
//
import { NavProps } from '../types';
import NavList from './NavList';

// ----------------------------------------------------------------------

export default function NavMobile({ isOffset, data }: NavProps) {
  const dispatch = useDispatch();
  const { pathname, replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthContext();

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      logout();
      replace(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          ml: 1,
          ...(isOffset && {
            color: 'text.primary',
          }),
          width: '48px',
          height: '49px',
        }}
      >
        <Iconify icon="eva:menu-2-fill" width={32} height={32} />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo sx={{ mx: 2.5, my: 3 }} />
            <Typography variant="h6" sx={{ color: 'brown' }}>
              {user?.name} - {user?.kode}
            </Typography>
          </Box>

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <NavList
            item={{
              title: 'Log out',
              icon: <Iconify icon="fa-solid:sign-out-alt" />,
              path: '#',
            }}
            onClick={handleLogout}
          />
        </Scrollbar>
      </Drawer>
    </>
  );
}

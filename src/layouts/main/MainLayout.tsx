// next
import dynamic from 'next/dynamic';
// @mui
import { Box } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
//
const Header = dynamic(() => import('./Header'), { ssr: false });
// const Footer = dynamic(() => import('./Footer'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { isAuthenticated } = useAuthContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        width: '100%',
      }}
    >
      <Box component="main" flexGrow={1} minHeight={1}>
        {isAuthenticated && <Header />}
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

// @mui
import { Box, Link, Container, Typography } from '@mui/material';

// components
import Logo from '../../components/logo';

export default function Footer() {
  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          made by<Link href="#"> VIUUM </Link>
        </Typography>
      </Container>
    </Box>
  );

  return simpleFooter;
}

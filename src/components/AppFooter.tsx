import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  const iconStyle = {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'warning.main',
    marginRight: 1,
    '&:hover': {
      backgroundColor: 'warning.dark',
    },
  };

  return (
    <Typography component="footer" sx={{ display: 'flex', backgroundColor: 'transparent', paddingTop: 'auto', paddingBottom: 'auto', paddingLeft: '30', paddingRight: 'auto'}}>
      <Container
        sx={{
          display: 'flex'
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid container direction="column" justifyContent="center" spacing={2} sx={{ height: 120 }}>
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://mui.com/" sx={iconStyle}>
                  <img
                    src="/src/assets/appFooterFacebook.png"
                    alt="Facebook"
                  />
                </Box>
                <Box component="a" href="https://twitter.com/MUI_hq" sx={iconStyle}>
                  <img
                    src="/src/assets/appFooterTwitter.png"
                    alt="Twitter"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  {'© '}
                  <Link color="inherit" href="https://google.com/">
                    ed-sinc
                  </Link>{' '}
                  {new Date().getFullYear()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

export default Footer;
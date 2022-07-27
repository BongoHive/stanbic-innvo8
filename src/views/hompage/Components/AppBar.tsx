import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
           
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            About
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eligibility Criteria
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Benefits
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stages
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FAQ
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contacts
          </Typography>
          <Grid>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

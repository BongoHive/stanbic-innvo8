import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Paper, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';

// import TotalFinnishBusinesses from './TotalFinnishBusinesses';
// import TotalCohorts from './TotalCohorts';
// import TotalZambianBusinesses from './TotalZambianBusinesses';
// import TotalBds from './TotalBds';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  image: {
    display: 'flex',
    width: '100%',
    hieght: '100%'
  },
  content: {
    marginTop: '10%',
    marginLeft: '5%'
  }
}));

function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page title="Dashboard">
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 2,
          margin: 'auto',
          width: '97%',
          flexGrow: 1,
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          borderColor: 'none',
          marginTop: '9%'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <img
              className={clsx(classes.image)}
              src="/images/team-work1.jpg"
              alt="freepik.com"
            />
          </Grid>

          <Grid item xs={12} md={6} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs className={clsx(classes.content)}>
                <Typography variant="h1">
                  Welcome to Stanbic Innov8 2.0
                </Typography>
                <br />
                <Typography variant="h3">
                  To submit your idea: create a team first, add your members and
                  then submit your idea
                </Typography>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/team/teams`)}
                  size="large"
                >
                  Create Team
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Page>
  );
}

export default Dashboard;

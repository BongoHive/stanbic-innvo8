import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  CircularProgress
} from '@mui/material';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: 1,
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: '#6f91b5',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/static/images/kartonWhite.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));
const registerAdmin = async (admin: Data) => {
  const { data: response } = await axios.patch('/Admin/signup', admin);
  return response;
};
export interface Data {
  email: string;
  password: string;
}
function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const notification = useNotify();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Data>({
    mode: 'onChange'
  });
  const { mutate, isLoading } = useMutation(registerAdmin, {
    onSuccess: (data) => {
      const { message, status } = data;
      if (status === 200 || status === 201 || status === 202) {
        dispatch(notification({ message, options: { variant: 'success' } }));
        setTimeout(() => navigate('/'), 1500);
      }
      if (status >= 400 || status <= 500) {
        dispatch(notification({ message, options: { variant: 'error' } }));
      }
    },
    onError: (error: AxiosError) => {
      dispatch(
        notification({
          message: error.response?.data.error,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['registered']);
    }
  });
  const onSubmit = (data: Data) => {
    const admin = {
      ...data
    };
    mutate(admin);
  };
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={6}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              {/* <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Welcome To Onyx Dashboard
              </Typography> */}
              {/* <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Takamaru Ayako
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Manager at inVision
                </Typography>
              </div> */}
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={6} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton>{/* <ArrowBackIcon /> */}</IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  className={classes.title}
                  variant="h2"
                  style={{ textAlign: 'center' }}
                >
                  Complete Sign Up
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  style={{ textAlign: 'center' }}
                >
                  Hey there! Lets get Started
                </Typography>

                <TextField
                  error={!!errors.email}
                  className={classes.textField}
                  fullWidth
                  label="Email address"
                  type="text"
                  variant="outlined"
                  {...register('email')}
                />
                <TextField
                  error={!!errors.password}
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register('password')}
                />
                {/* <div className={classes.policy}>
                  <Checkbox
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div> */}

                <Button
                  className={classes.signUpButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  startIcon={
                    isLoading ? (
                      <CircularProgress color="inherit" size={26} />
                    ) : null
                  }
                >
                  Sign Up
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
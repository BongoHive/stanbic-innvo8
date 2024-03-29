import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
import Logo from '../../../components/Logo';

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
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: '#6f91b5',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/lady.jpeg)',
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
    width: 100,
    paddingLeft: 40,
    paddingRight: 40,
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
export interface Data {
  email: string;
  password: string;
  confirmPassword: string;
}

const registerAdmin = async (admin: Data) => {
  const { data: response } = await axios.patch('/Auth/set_password', admin);
  return response;
};

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be longer than 8 characters.')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null, ''], "Passwords don't match")
    .required('Password confirmation is required')
});

function CompleteSignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
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
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const { mutate, isLoading } = useMutation(registerAdmin, {
    onSuccess: (data) => {
      const { message } = data;
      dispatch(notification({ message, options: { variant: 'success' } }));
      setTimeout(() => navigate('/signin'), 1500);
    },
    onError: (error: AxiosError) => {
      dispatch(
        notification({
          message: error.response?.data,
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
        <Grid className={classes.content} xs={12} sm={6} md={4} lg={4} xl={4}>
          <div className={classes.content}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '150px',
                paddingBottom: '1px'
              }}
            >
              <Logo />
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  className={classes.title}
                  variant="h2"
                  style={{ textAlign: 'center' }}
                >
                  Complete Registration
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  style={{ textAlign: 'center' }}
                >
                  <p>
                    Enter your email and password to complete your registration
                  </p>
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
                  variant="outlined"
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  error={Boolean(errors.confirmPassword?.message)}
                  className={classes.textField}
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
        <Grid
          className={classes.quoteContainer}
          item
          xs={12}
          sm={6}
          md={8}
          lg={8}
          xl={8}
        >
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
      </Grid>
    </div>
  );
}

export default CompleteSignUp;

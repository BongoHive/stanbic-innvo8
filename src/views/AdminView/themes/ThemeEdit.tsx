/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FunctionComponent } from 'react';
import {
  Button,
  TextField,
  Container,
  Card,
  CardContent,
  CardHeader,
  CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from '../../../clientProvider/baseConfig';
// @ts-ignore
import { Teams } from '../../../../types';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
import { Themes } from './ThemesEditView';
// import branch from '../../../../components/branch';

interface Props {
  data: Themes;
}

const createUser = async (user: Themes) =>
  axios.put(`/Theme/edit_theme/${user._id}`, user);

const ThemeEdit: FunctionComponent<React.PropsWithChildren<Props>> = (
  props
) => {
  const { data } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Themes>({
    defaultValues: data,
    mode: 'onChange'
  });

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (response) => {
      const { message } = response.data;
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      setTimeout(() => navigate(-1), 1000);
    },
    onError: (err: any) => {
      const message = err.response?.data;
      dispatch(
        enqueueSnackbar({
          message,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['Themes']);
    }
  });

  const onSubmit = (inputs: Teams) => {
    const user = {
      ...inputs,
      _id: data._id
    };
    mutate(user);
  };

  return (
    <Container style={{ marginTop: 28 }}>
      <Card>
        <CardHeader title="Edit User  Information" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={!!errors.name}
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
              {...register('name')}
            />
            <TextField
              error={!!errors.description}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              size="small"
              margin="normal"
              {...register('description')}
            />

            <Button
              disabled={isLoading}
              variant="contained"
              color="primary"
              size="large"
              startIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : null
              }
              type="submit"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ThemeEdit;

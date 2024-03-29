/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge,
  Grid,
  Box
} from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { useNotify } from '../../redux/actions/notifications/notificationActions';
import axios from '../../clientProvider/baseConfig';
import Loading from '../../components/Loading';
import { RootState } from '../../redux/reducers/rootReducer';

const getUser = async (): Promise<any[]> => {
  const { data: response } = await axios.get('/Innovation/view_innovations');
  return response.Innovations;
};

const MAX_DESCRIPTION_LENGTH = 100;

const Upvotes: React.FC<React.PropsWithChildren<unknown>> = () => {
  const queryClient = useQueryClient();
  const [expandedInnovationId, setExpandedInnovationId] = React.useState('');
  const { data, isLoading } = useQuery(['upvoting'], getUser);
  const { user } = useSelector((store: RootState) => store.user);
  const enqueueSnackbar = useNotify();
  const dispatch = useDispatch();

  const upvoteInnovation = async (innovationId: string) => {
    const { data: response } = await axios.patch(
      `/Innovation/like_innovation/${innovationId}`,
      {
        likedBy: user?._id
      }
    );
    return response;
  };

  const upvoteMutation = useMutation(upvoteInnovation, {
    // onSuccess: (response) => {
    //   const { message } = response;
    //   dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
    // },
    onError: (error: AxiosError) => {
      const message = error.response?.data;
      dispatch(
        enqueueSnackbar({
          message,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['upvoting']);
    }
  });

  const orderedData = React.useMemo(() => {
    return (
      data
        ?.slice() // Create a copy of the data array
        .sort((a, b) => {
          const dateA = Date.parse(a.createdAt);
          const dateB = Date.parse(b.createdAt);
          return dateB - dateA;
        }) ?? []
    );
  }, [data]);

  const sortedData = React.useMemo(() => {
    return (
      data
        ?.slice(0, 5) // Take only the top 5 items
        .sort((a, b) => b.likes - a.likes) ?? []
    );
  }, [data]);

  if (isLoading) {
    return <Loading size={40} />;
  }

  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {orderedData?.map((innov) => (
            <Card
              key={innov?._id}
              sx={{
                width: '100%',
                marginBottom: '16px',
                borderRadius: '15px',
                '&:hover': {
                  boxShadow: '0 0 4px rgba(0, 0, 255, 1)'
                },
                backgroundColor: '#fff'
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{ paddingBottom: 1 }}
                  color="primary"
                >
                  {innov?.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ paddingBottom: 1 }}
                >
                  {innov?.problem}
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ paddingBottom: 1 }}
                >
                  Solution
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    paddingBottom: 1,
                    maxHeight:
                      expandedInnovationId === innov?._id ? 'none' : '2.7em',
                    overflow: 'hidden'
                  }}
                >
                  {innov?.proposedSolution}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  {innov?.proposedSolution?.length > MAX_DESCRIPTION_LENGTH && (
                    <button
                      style={{
                        border: 'none',
                        outline: 'none',
                        textDecoration: 'underline',
                        background: 'none',
                        cursor: 'pointer',
                        paddingTop: '10px',
                        paddingBottom: '12px'
                      }}
                      onClick={() =>
                        setExpandedInnovationId(
                          expandedInnovationId === innov?._id ? '' : innov?._id
                        )
                      }
                    >
                      {expandedInnovationId === innov?._id
                        ? 'Read Less'
                        : 'Read More'}
                    </button>
                  )}
                  <div>
                    <IconButton
                      color="info"
                      size="large"
                      onClick={() => upvoteMutation.mutate(innov?._id)}
                    >
                      <Badge
                        badgeContent={innov?.likes}
                        color="primary"
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left'
                        }}
                      >
                        {innov?.likedBy?.includes(user?._id) ? (
                          <FavoriteOutlinedIcon />
                        ) : (
                          <FavoriteBorderOutlinedIcon />
                        )}
                      </Badge>
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              backgroundColor: '#00A1E0',
              padding: 2,
              borderRadius: '10px',
              marginBottom: 5
            }}
          >
            <Typography
              sx={{
                color: '#fff',
                font: 'BentonSans Bold',
                fontWeight: 400,
                fontSize: '20px'
              }}
            >
              Top 5
            </Typography>
            {sortedData?.map((innov) => (
              <Card
                key={innov?._id}
                sx={{
                  width: '100%',
                  marginBottom: '16px',
                  borderRadius: '5px',
                  '&:hover': {
                    boxShadow: '0 0 4px rgba(0, 0, 255, 1)'
                  },
                  backgroundColor: '#0A2240'
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{ paddingBottom: 1, color: '#fff' }}
                    >
                      {innov?.title}
                    </Typography>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div>
                        <IconButton
                          color="info"
                          size="large"
                          onClick={() => upvoteMutation.mutate(innov?._id)}
                        >
                          <Badge
                            badgeContent={innov?.likes}
                            color="primary"
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left'
                            }}
                          >
                            {innov?.likedBy?.includes(user?._id) ? (
                              <FavoriteOutlinedIcon />
                            ) : (
                              <FavoriteBorderOutlinedIcon />
                            )}
                          </Badge>
                        </IconButton>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Upvotes;

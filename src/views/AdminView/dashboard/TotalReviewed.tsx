/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useQuery } from 'react-query';
import { axios } from '../../../clientProvider';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: orange[600],
    height: 46,
    width: 46
  }
}));
interface Props {
  className?: string;
}

const getCohorts = async (): Promise<number> => {
  const data = await axios.get('/Innovation/count_reviewed_innovations');
  return data.data?.Innovations;
};

const TotalReviewed: FC<React.PropsWithChildren<Props>> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { data } = useQuery(['cohortCount'], getCohorts);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item md={9}>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Reviewed
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data || 0}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Avatar className={classes.avatar}>
              <ReviewsIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalReviewed.propTypes = {
  className: PropTypes.string
};

export default TotalReviewed;

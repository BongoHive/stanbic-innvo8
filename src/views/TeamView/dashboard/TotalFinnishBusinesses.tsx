/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';
import MoneyIcon from '@mui/icons-material/Money';
import { useQuery } from 'react-query';
import { axios } from '../../../clientProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: red[600],
    height: 46,
    width: 46
  },
  differenceIcon: {
    color: red[900]
  },
  differenceValue: {
    color: red[900],
    marginRight: theme.spacing(1)
  }
}));

const getFinnishBusinesses = async (): Promise<number> => {
  const data = await axios.get('#');
  return data.data?.businessCount;
};

const TotalFinnishBusinesses: FC<React.PropsWithChildren<any>> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { data } = useQuery(['finnishBusinessesCount'], getFinnishBusinesses);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item md={9}>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Submitted
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data || 0}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
TotalFinnishBusinesses.propTypes = {
  className: PropTypes.string
};

export default TotalFinnishBusinesses;

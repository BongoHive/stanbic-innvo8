/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { Button, Chip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { RemoveRedEye } from '@mui/icons-material';
import axios from '../../../clientProvider/baseConfig';
import Loading from '../../../components/Loading';

const getApp = async (): Promise<any[]> => {
  const { data } = await axios.get('/Innovation/view_reviewed_innovations');
  return data.Innovations;
};

const ReviewedApplications: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useQuery(['ReviewedSubmissions'], getApp);

  if (isLoading) {
    return <Loading size={40} />;
  }

  const columns: MUIDataTableColumn[] = [
    {
      name: '_id',
      label: 'ID',
      options: {
        filter: false,
        display: 'false'
      }
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'teamId.name',
      label: 'Team',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'totalVotes',
      label: 'Total Votes',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => (
          <Chip variant="outlined" color="primary" label={value} />
        )
      }
    },
    {
      name: '',
      label: '',
      options: {
        filter: true,
        viewColumns: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const [userId] = tableMeta.rowData;
          return (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                navigate(`${location.pathname}/view/${userId}`);
              }}
              size="small"
              startIcon={<RemoveRedEye />}
            >
              view
            </Button>
          );
        }
      }
    }
  ];
  return (
    <MUIDataTable
      options={{
        elevation: 0,
        enableNestedDataAccess: '.',
        responsive: 'simple',
        filterType: 'dropdown'
      }}
      title="Applications"
      columns={columns}
      data={data || []}
    />
  );
};

export default ReviewedApplications;

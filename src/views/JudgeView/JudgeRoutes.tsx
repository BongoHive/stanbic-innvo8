/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Navigate } from 'react-router-dom';
import JudgeLayout from '../../layouts/JudgeLayout';
import NotFoundView from '../errors/NotFoundView';
import AccountView from '../JudgeView/account';
import Dashboard from './dashboard';
import Submissions from './Submission';
import SubmissionViewDetails from './Submission/ApplicationViewDetails';
//  import MainLayout from './layouts/MainLayout';

export const JudgeRoutes = [
  {
    path: 'judge',
    element: <JudgeLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'submissions',
        element: <Submissions />
      },
      {
        path: 'submissions/view/:id',
        element: <SubmissionViewDetails />
      },
      {
        path: 'account',
        element: <AccountView />
      },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/judge/404" /> }
    ]
  }
];

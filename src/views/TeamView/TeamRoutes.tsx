/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Navigate } from 'react-router-dom';
import TeamLayout from '../../layouts/TeamLayout';
import NotFoundView from '../errors/NotFoundView';
import AccountView from '../TeamView/account';
import Dashboard from './dashboard';
import InnovationProposal from './proposal';
import ProposalForm from './proposal/components/ProposalForm';
import ProposalView from './proposal/components/ProposalView';
import ProposalEditView from './proposal/components/ProprosalEditView';
import TeamsListView from './teams';
import TeamView from './teams/components/TeamView';
import TeamEditView from './teams/components/TeamEditView';
import TeamProposalView from './teams/components/TeamProposalView';

export const TeamRoutes = [
  {
    path: 'team',
    element: <TeamLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'account',
        element: <AccountView />
      },
      {
        path: 'innovation-idea',

        element: <InnovationProposal />
      },
      { path: 'innovation-create', element: <ProposalForm /> },
      { path: 'innovation-edit', element: <ProposalEditView /> },
      { path: 'innovation-view', element: <ProposalView /> },
      {
        path: 'teams',
        element: <TeamsListView />
      },
      {
        path: 'teams/:id',
        element: <TeamView />
      },
      {
        path: 'teams-edit/:id',
        element: <TeamEditView />
      },
      { path: 'team-innovation-view', element: <TeamProposalView /> },
      // add routes for editing here
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/team/404" /> }
    ]
  }
];

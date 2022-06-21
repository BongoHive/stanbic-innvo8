import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminRoutes } from './views/AdminView/AdminRoutes';
// import ProtectedRoutes from './components/ProtectedRoutes';
import MainLayout from './layouts/MainLayout';
import ForgotPassword from './views/auth/forgotPassword';
import ResetPassword from './views/auth/resetPassword';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import { TeamRoutes } from './views/TeamView/TeamRoutes';
import NotFoundView from './views/errors/NotFoundView';
import { JudgeRoutes } from './views/JudgeView/JudgeRoutes';

const routes = [
  {
    path: '*',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  { path: '/', element: <SignIn /> },
  { path: 'signup', element: <SignUp /> },
  { path: 'forgot-password', element: <ForgotPassword /> },
  { path: 'resetpassword/:resetPasswordToken', element: <ResetPassword /> },
  ...AdminRoutes,
  ...TeamRoutes,
  ...JudgeRoutes
];

export default routes;

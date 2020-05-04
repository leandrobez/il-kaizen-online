import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Plans from './components/pages/Plans';
import Contact from './components/pages/Contact';
import Agreement from './components/pages/Agreement';

import Notification from './components/pages/Notification';
import Video from './components/pages/Video';
import Error from './components/pages/Error';
const router = [
  {
    path: '/',
    exact: true,
    page: Home,
  },
  {
    path: '/about',
    exact: true,
    page: About,
  },
  {
    path: '/plans',
    exact: true,
    page: Plans,
  },
  {
    path: '/Contact',
    exact: true,
    page: Contact,
  },
  {
    path: '/agreement/:plan',
    exact: true,
    page: Agreement,
  },
  {
    path: '/gerencianet/plan/notification',
    exact: true,
    page: Notification,
  },
  {
    path: '/video',
    exact: true,
    page: Video,
  },
  {
    path: '/*',
    exact: false,
    page: Error,
  },
];

class Routes extends Component {
  render() {
    return router.map((route, index) => (
      <Route
        key={'link_' + index}
        path={route.path}
        exact={route.exact}
        component={route.page}
      />
    ));
  }
}

export default Routes;

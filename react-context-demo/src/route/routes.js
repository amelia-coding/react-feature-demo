import { lazy } from 'react';

export const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/home/Home')),
    exact: true,
  },
  {
    path: '/cart',
    component: lazy(() => import('../pages/cart')),
  },
  {
    path: '/table',
    component: lazy(() => import('../pages/table')),
  },
  {
    path: '/counter',
    component: lazy(() => import('../pages/counter/Counter')),
  },
];

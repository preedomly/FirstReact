import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
  path: '/marriage',
  title: '结婚照',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);

const { ERRORS } = require('./error.routes');

const wrappers = ['@/wrappers/auth.admin'];

/**
 * @export
 * @return {{}}
 * @constructor
 */
const ADMIN_ROUTES = (adminPath = '/ex') => {
  const adminErrors = ERRORS(adminPath, '');

  return {
    exact: false,
    path: adminPath,
    component: '@/layouts/app',
    breadcrumb: 'route.admin',
    routes: [
      {
        exact: true,
        path: `${adminPath}/cards`,
        component: '@/pages/cards',
        breadcrumb: 'route.cards',
        wrappers
      },
      ...adminErrors
    ]
  };
};

module.exports = { ADMIN_ROUTES };

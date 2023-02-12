const { ERRORS } = require('./error.routes');

const wrappers = ['@/wrappers/auth.admin'];

/**
 * @export
 * @return {{}}
 * @constructor
 */
const ADMIN_ROUTES = (adminPath = '/admin') => {
  const adminErrors = ERRORS(adminPath, '');

  return {
    exact: false,
    path: adminPath,
    component: '@/layouts/app',
    breadcrumb: 'route.admin',
    routes: [
      {
        exact: true,
        path: `${adminPath}/errors`,
        component: '@/pages/errorLogs',
        breadcrumb: 'route.errorLogs',
        wrappers
      },
      ...adminErrors
    ]
  };
};

module.exports = { ADMIN_ROUTES };

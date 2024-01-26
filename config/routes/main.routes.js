const { ERRORS } = require('./error.routes');
const { ADMIN_ROUTES } = require('./admin.routes');

const wrappers = ['@/wrappers/auth.consumer'];

const MAIN_ROUTES = (mainPath = '') => {
  const mainErrors = ERRORS(mainPath);
  const adminRoutes = ADMIN_ROUTES();

  return {
    exact: false,
    path: `${mainPath}/`,
    component: '@/layouts/landing',
    routes: [
      {
        exact: true,
        path: `${mainPath}/`,
        redirect: '/ex/cards'
      },
      adminRoutes,
      ...mainErrors
    ]
  };
};

module.exports = { MAIN_ROUTES };
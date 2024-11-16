const { ERRORS } = require('./error.routes');

const wrappers = ['@/wrappers/auth.consumer'];

const MAIN_ROUTES = (mainPath = '') => {
  const mainErrors = ERRORS(mainPath);

  return {
    exact: false,
    path: `${mainPath}/`,
    component: '@/layouts/landing',
    routes: [
      {
        exact: true,
        path: `${mainPath}/`,
        redirect: '/flip-cards'
      },
      {
        exact: true,
        path: `${mainPath}/flip-cards`,
        component: '@/pages/cards'
      },
      ...mainErrors
    ]
  };
};

module.exports = { MAIN_ROUTES };
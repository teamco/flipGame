const colors = require('colors');

const { MAIN_ROUTES } = require('./routes/main.routes');

const { NODE_ENV } = process.env;

const isDevelopment = NODE_ENV === 'development';
const mainRoutes = MAIN_ROUTES();

function routesList() {
  console.log('\n\n==== ROUTES =====\n');
  mainRoutes.routes.forEach(route => {
    console.log(colors.green(route.path), '=>', colors.cyan(route.component));
  });

  console.log('\n==== ADMIN\n');

  mainRoutes.routes.find(r => !r.exact).routes.forEach(route => {
    console.log(colors.green(route.path), '=>', colors.cyan(route.component));
  });

  console.log('\n==== /ROUTES =====\n\n');
}

isDevelopment && routesList();

module.exports = { routes: [mainRoutes] };

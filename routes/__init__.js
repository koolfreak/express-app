'use strict'

/*const routes = [
  require('./routes/owners'),
  require('./routes/pets')
];*/
const routes = [
  require('./index'),
  require('./users')
];

// Add access to the app and db objects to each route
module.exports = function router(app, db, passport) {
  return routes.forEach((route) => {
    route(app, db, passport);
  });
};
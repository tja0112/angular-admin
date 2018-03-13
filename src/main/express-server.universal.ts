// TODO: considerar sacar esto como lo tenemos en los main.browser.ts
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';

import { rootRoutes } from '../app/app.routes'; // Root routes
import { formsRoutes } from '../app/forms/forms.module'; // Lazy "forms" routes
import { tablesRoutes } from '../app/tables/tables.module'; // Lazy "tables" routes
import { chartsRoutes } from '../app/charts/charts.module'; // Lazy "charts" routes
import { utilsRoutes } from '../app/utils/utils.module'; // Lazy "utils" routes
import { layoutsRoutes } from '../app/layouts/layouts.module'; // Lazy "layouts" routes

function processLazyRoutes(out, route, root) {
  if (route.path !== '')
    out.push({ path: root + route.path });
  return out;
};

export function universalServer(serverModule): void {
  const app = express();
  const port = process.env.PORT || 3001;
  const base_url = process.env.BASE_URL || 'http://localhost';
  const url = `${base_url}:${port}`;

  app.engine('html', ngExpressEngine({
    bootstrap: serverModule
  }));

  app.set('view engine', 'html');
  app.set('views', 'dist');

  app.use('/', express.static('dist', { index: false }));

  const routes = rootRoutes.concat(
   formsRoutes.reduce(function (out, route) {
     return processLazyRoutes(out, route, 'forms/')
   }, []),
   tablesRoutes.reduce(function(out, route) {
     return processLazyRoutes(out, route, 'tables/')
   }, []),
   chartsRoutes.reduce(function(out, route) {
     return processLazyRoutes(out, route, 'charts/')
   }, []),
   utilsRoutes.reduce(function(out, route) {
     return processLazyRoutes(out, route, 'utils/')
   }, []),
   layoutsRoutes.reduce(function(out, route) {
     return processLazyRoutes(out, route, 'layouts/')
   }, [])
 );

  // To enable proper 404 redirects in non existent routes we need to specify the existing routes and then
  // add a '*' route for all the non existent routes to be treated with a 404 status
  routes.forEach(route => {
    app.get(`/${route.path}`, (req, res) => {
      res.render('index.html', {
        req,
        res
      });
    });
  });

  app.get('*', (req, res) => {
    res.status(404).render('../dist/index.html', {
      req,
      res,
      requestUrl: '/404'
    });
  });

  app.listen(port, () => {
    console.log(`Listening at ${url}`);
  });
}

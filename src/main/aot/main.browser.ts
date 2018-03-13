import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { platformBrowser } from '@angular/platform-browser';
import { BrowserAppModuleNgFactory } from '../../app/browser-app.module.ngfactory';

import '../common.browser';

platformBrowser().bootstrapModuleFactory(BrowserAppModuleNgFactory);

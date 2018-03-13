import { universalServer } from '../express-server.universal';
import { ServerAppModuleNgFactory } from '../../app/server-app.module.ngfactory';
import { enableProdMode } from '@angular/core';

import '../common.server';

// This is a fix is a patch because Material has some issues with Universal.
// Read more in https://github.com/angular/material2/issues/308#issuecomment-247760746
var window = global;
global['window'] = window;


enableProdMode(); //this forces prod mode always for aot universal. This is a workaround to solve an issue with Safari

universalServer(ServerAppModuleNgFactory);

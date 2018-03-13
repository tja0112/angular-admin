import { universalServer } from '../express-server.universal';
import { ServerAppModule } from '../../app/server-app.module';

import '../common.server';

universalServer(ServerAppModule);

import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule } from '@angular/router';

import { rootRoutes } from './app.routes';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(rootRoutes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false
    }),
    CoreModule,
    SharedModule
  ],
  providers: [

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

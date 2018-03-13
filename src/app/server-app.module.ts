import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import { APP_BASE_HREF } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    NoopAnimationsModule,
    BrowserModule.withServerTransition({
      appId: 'app'
    }),
    ServerModule,
    AppModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: `${process.env.BASE_URL}`}]
})
export class ServerAppModule {}

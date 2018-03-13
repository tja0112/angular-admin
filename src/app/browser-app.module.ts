import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Just include the intersection-observer polyfill is we are in the browser (To prevent Angular Universal window errors)
require('intersection-observer');
import 'hammerjs';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app'
    }),
    BrowserAnimationsModule,
    AppModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: `${process.env.BASE_URL}`}]
})
export class BrowserAppModule {}

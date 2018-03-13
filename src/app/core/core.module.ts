import { NgModule } from '@angular/core';

import { BreadcrumbComponent } from './';

// Top navbar stuff
import { MessagesMenuComponent, MessagesMenuService } from './';
import { NotificationsMenuButtonComponent } from './';
import { NotificationsMenuContentComponent, NotificationsMenuService } from './';
import { SearchBarComponent } from './';
import { TopNavbarContentComponent } from './';

// Side menu stuff
import { CondenseMenuComponent } from './';
import { MenuTopItemsComponent } from './';
import { SideMenuService } from './';
import { SideMenuContentComponent } from './';

// 404 page stuff
import { Error404PageComponent } from './';
import { Error404PageResolver } from './';

import { ResponsiveBreakpointsComponent } from './';
import { ResponsiveBreakpointDirective } from './';
import { ResponsiveBreakpointsService } from './';

// Required modules
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    // Top navbar stuff
    MessagesMenuComponent,
    NotificationsMenuButtonComponent,
    NotificationsMenuContentComponent,
    SearchBarComponent,
    TopNavbarContentComponent,
    // Side menu stuff
    CondenseMenuComponent,
    MenuTopItemsComponent,
    SideMenuContentComponent,
    // 404
    Error404PageComponent,
    // Responsive stuff
    ResponsiveBreakpointDirective,
    ResponsiveBreakpointsComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    MessagesMenuService,
    NotificationsMenuService,
    SideMenuService,
    // 404
    Error404PageResolver,
    // Responsive stuff
    ResponsiveBreakpointsService
  ],
  exports: [
    BreadcrumbComponent,
    TopNavbarContentComponent,
    SideMenuContentComponent,
    NotificationsMenuContentComponent,
    // 404
    Error404PageComponent,
    // Responsive stuff
    ResponsiveBreakpointsComponent
  ]
})
export class CoreModule { }

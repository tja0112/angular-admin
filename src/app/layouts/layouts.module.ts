import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule as ng2ChartsModule } from 'ng2-charts';

import { ChartsDataService, Ng2ChartsResolver } from '../charts';
import {
  CardsPageComponent,
  CardsResolver,
  GridsPageComponent,
  LayoutsService,
  ListsPageComponent,
  ListsResolver,
  TabsPageComponent
} from './';

import { SharedModule } from '../shared/shared.module';

export const layoutsRoutes = [
  { path: '', redirectTo: 'grids' },
  { path: 'grids', component: GridsPageComponent },
  { path: 'lists', component: ListsPageComponent, resolve: { data : ListsResolver }  },
  { path: 'cards', component: CardsPageComponent, resolve: { data : CardsResolver } },
  { path: 'tabs', component: TabsPageComponent, resolve: { data : Ng2ChartsResolver } }
];

@NgModule({
  declarations: [
    GridsPageComponent,
    ListsPageComponent,
    CardsPageComponent,
    TabsPageComponent
  ],

  providers: [
    ChartsDataService,
    Ng2ChartsResolver,
    ListsResolver,
    CardsResolver,
    LayoutsService
  ],
  imports: [
    RouterModule.forChild(layoutsRoutes),
    CommonModule,
    ng2ChartsModule,
    SharedModule
  ]
})
export class LayoutsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { ModalComponent } from '../utils';

import {
  ExtendedTablesPageComponent,
  ExtendedTablesResolver,
  RegularTablesPageComponent,
  RegularTablesResolver,
  SmartTablesPageComponent,
  SmartTablesResolver,
  TableDataService
} from './';

import { NgDatepickerModule } from 'ng2-datepicker';
import { NouisliderModule } from 'ng2-nouislider';
import { Ng2SmartTableModule } from 'ng2-smart-table';

export const tablesRoutes = [
  { path: '', redirectTo: 'regular' },
  { path: 'regular', component: RegularTablesPageComponent, resolve: { tableData : RegularTablesResolver } },
  { path: 'extended', component: ExtendedTablesPageComponent, resolve: { tableData : ExtendedTablesResolver } },
  { path: 'smart', component: SmartTablesPageComponent, resolve: { tableData : SmartTablesResolver } }
];

@NgModule({
  declarations: [
    RegularTablesPageComponent,
    ExtendedTablesPageComponent,
    SmartTablesPageComponent
  ],

  providers: [
    TableDataService,
    RegularTablesResolver,
    ExtendedTablesResolver,
    SmartTablesResolver
  ],

  entryComponents: [
    ModalComponent
  ],

  imports: [
    RouterModule.forChild(tablesRoutes),
    Ng2SmartTableModule,
    NouisliderModule,
    NgDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule
  ]
})
export class TablesModule { }

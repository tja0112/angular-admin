import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { NgDatepickerModule } from 'ng2-datepicker';
import { NouisliderModule } from 'ng2-nouislider';

import {
  ControlsAndValidationsPageComponent,
  ExtendedControlsPageComponent,
  FormsExtendedControlsResolver,
  FormsLayoutsResolver,
  FormsValidationsResolver,
  FormsWizardResolver,
  SampleLayoutsPageComponent,
  WizardPageComponent
} from './';

export const formsRoutes = [
  {
    path: '',
    redirectTo: 'controls-and-validations'
  },
  {
    path: 'controls-and-validations',
    component: ControlsAndValidationsPageComponent,
    resolve: {
      data: FormsValidationsResolver
    }
  },
  {
    path: 'extended-controls',
    component: ExtendedControlsPageComponent,
    resolve: {
      data: FormsExtendedControlsResolver
    }
  },
  {
    path: 'sample-layouts',
    component: SampleLayoutsPageComponent,
    resolve: {
      data: FormsLayoutsResolver
    }
  },
  {
    path: 'wizard',
    component: WizardPageComponent,
    resolve: {
      data: FormsWizardResolver
    }
  }
];

@NgModule({
  declarations: [
    ControlsAndValidationsPageComponent,
    ExtendedControlsPageComponent,
    SampleLayoutsPageComponent,
    WizardPageComponent
  ],
  imports: [
    RouterModule.forChild(formsRoutes),
    SharedModule,
    NouisliderModule,
    NgDatepickerModule
  ],
  providers: [
    FormsValidationsResolver,
    FormsExtendedControlsResolver,
    FormsLayoutsResolver,
    FormsWizardResolver
  ]
})
export class FormsModule { }

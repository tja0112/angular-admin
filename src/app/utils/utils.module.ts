import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {
  AlertsPageComponent,
  AutoCompleterPageComponent,
  AutoCompleterService,
  FileUploaderPageComponent,
  FileUploaderDirective,
  LoginModalComponent,
  ModalComponent,
  ModalsPageComponent,
  NotificationComponent,
  NotificationsPageComponent,
  RegisterModalComponent
} from './';

export const utilsRoutes = [
  { path: '', redirectTo: 'image-uploader' },
  { path: 'file-uploader', component: FileUploaderPageComponent },
  { path: 'auto-completer', component: AutoCompleterPageComponent },
  { path: 'modals', component: ModalsPageComponent },
  { path: 'notifications', component: NotificationsPageComponent },
  { path: 'alerts', component: AlertsPageComponent }
];

@NgModule({
  declarations: [
    FileUploaderPageComponent,
    FileUploaderDirective,
    AutoCompleterPageComponent,
    ModalsPageComponent,
    NotificationsPageComponent,
    NotificationComponent,
    LoginModalComponent,
    RegisterModalComponent,
    AlertsPageComponent,
    ModalComponent,
  ],

  providers: [
    AutoCompleterService,
  ],

  entryComponents: [
    LoginModalComponent,
    ModalComponent,
    RegisterModalComponent,
    NotificationComponent
  ],

  imports: [
    RouterModule.forChild(utilsRoutes),
    SharedModule
  ]
})
export class UtilsModule { }

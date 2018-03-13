import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material modules
import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatDatepickerModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';

import { PreloadImageComponent } from './';


@NgModule({
  declarations: [
    // Shared components
    PreloadImageComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    // Material modules
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [

  ],
  exports: [
    // Shared components
    PreloadImageComponent,
    // Re-export these modules to prevent repeated imports (see: https://angular.io/guide/ngmodule#re-exporting-other-modules)
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    // Material modules
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatInputModule
  ]
})
export class SharedModule { }

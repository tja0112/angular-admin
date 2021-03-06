import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { MatChipInputEvent } from '@angular/material';
import 'rxjs/add/operator/debounceTime';

const COMMA = 188;
const ENTER = 13;

@Component({
  selector: 'extended-controls-page',
  templateUrl: './extended-controls.component.html',
  styleUrls: [ './styles/extended-controls.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class ExtendedControlsPageComponent {
  controlsForm: FormGroup;
  formElements: FormGroup;
  datepickerOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2070,
    displayFormat: 'DD MMM YYYY',
    barTitleFormat: 'DD MMMM YYYY',
    firstCalendarDay: 1 // 0 - Sunday, 1 - Monday
  };

  // Tags inputs
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [COMMA, ENTER];
  chips = {
    regular: [
      'MINIMAL',
      'LIGHT',
      'NEW' ,
      'FRIENDS'
    ],
    filled: [
      'MINIMAL',
      'LIGHT',
      'NEW' ,
      'FRIENDS'
    ]
  };

  constructor(fb: FormBuilder) {
    this.controlsForm = fb.group({
      help: new FormControl(''),
      password: new FormControl(''),
      placeholder: new FormControl(''),
      disabled: new FormControl({value: 'Disabled', disabled: true}),
      date: new FormControl({value: (new Date()), disabled: true}),
      color: new FormControl(''),
      message: new FormControl(''),
      radio: new FormControl(''),
      checkbox1: new FormControl(''),
      checkbox2: new FormControl(''),
      checkbox3: new FormControl(''),
      checkbox4: new FormControl(false),
      checkbox5: new FormControl(true),
      checkbox6: new FormControl({value: false, disabled: true}),
      checkbox7: new FormControl({value: true, disabled: true}),
      radio1: new FormControl('second'),
      radio2: new FormControl({value: 'fourth', disabled: true}),
      success: new FormControl(''),
      error: new FormControl(''),
      addon1: new FormControl(''),
      addon2: new FormControl(''),
      column1: new FormControl(''),
      column2: new FormControl(''),
      column3: new FormControl(''),
      column4: new FormControl(''),
      column5: new FormControl(''),
      animal: new FormControl('')
    });

    this.formElements = fb.group({
      nouislider: [[20, 50]],
      slider: new FormControl('30')
    });
  }

  add(event: MatChipInputEvent, chipList: string): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.chips[chipList].push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(chip: any, chipList: string): void {
    const index = this.chips[chipList].indexOf(chip);
    if (index >= 0) {
      this.chips[chipList].splice(index, 1);
    }
  }
}

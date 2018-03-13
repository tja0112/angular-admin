import { AfterViewChecked, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { DatepickerOptions, NgDatepickerComponent } from 'ng2-datepicker';
import { ModalComponent } from '../../../utils';

const COMMA = 188;
const ENTER = 13;

@Component({
  selector: 'ngx-smart-tables-page',
  templateUrl: './smart-tables.component.html',
  styleUrls: [ './styles/smart-tables.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class SmartTablesPageComponent implements AfterViewChecked {
  // Rows per page for the smart table
  perPage = 4;

  // Settings object for the smart tables
  // https://akveo.github.io/ng2-smart-table/#/documentation
  settings = {
    pager: {
      display: true,
      perPage: this.perPage
    },
    delete: {
      confirmDelete: true
    },
    add: {
      confirmCreate: true
    },
    edit: {
      confirmSave: true
    },
    noDataMessage: 'No data to display',
    columns: undefined
  };

  // Filters for the smart table
  filtersForm: FormGroup;
  filtersVisible = true;
  toggleFiltersLabel = 'Hide filters';

  // Data from the resolver
  data = [];

  // Settings and data for the tables
  settingsLocalFilters = undefined;
  settingsManualFilters = undefined;
  dataSourceLocalFilters = undefined;
  dataSourceManualFilters = undefined;

  // Tags interests
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [COMMA, ENTER];
  interests = [];

  // Date picker
  @ViewChild('dpicker') dpicker;
  dateInit = false;
  today = new Date();
  datepickerOptions: DatepickerOptions = {
    minYear: this.today.getFullYear(),
    maxYear: this.today.getFullYear(),
    displayFormat: 'DD MMM',
    barTitleFormat: 'MMMM',
    firstCalendarDay: 1 // 0 - Sunday, 1 - Monday
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    const tableData = route.snapshot.data['tableData'];
    this.data = tableData.data;

    // Load columns and data for the frist smart table

    // Set up the form
    this.filtersForm = fb.group({
      search : '',
      ageRange: [[20, 50]],
      interests: [[]],
      bday: this.today
    });
    this.filtersForm.valueChanges.subscribe(form => { this.formFilter(form); });

    // Set up the data, columns and settings
    this.dataSourceManualFilters = new LocalDataSource(this.data);
    this.settingsManualFilters = this.copyObject(this.settings);
    this.settingsManualFilters.columns = this.copyObject(tableData.columns);

    // Turn the default filters off to avoid conflicts
    Object.keys(this.settingsManualFilters.columns).forEach(key => {
      this.settingsManualFilters.columns[key].filter = false;
    });

    // Replace the ID string with an image
    this.settingsManualFilters.columns.picture.valuePrepareFunction = this.prepareProfilePicCell;
    this.settingsManualFilters.columns.picture.type = 'html';

    // Add classes for coloring the status cells
    this.settingsManualFilters.columns.status.valuePrepareFunction = this.prepareStatusCell;
    this.settingsManualFilters.columns.status.type = 'html';

    // Load columns and data for the local filters table

    // Set up the data, columns and settings
    this.dataSourceLocalFilters = new LocalDataSource(this.data);
    this.settingsLocalFilters = this.copyObject(this.settings);
    this.settingsLocalFilters.columns = this.copyObject(tableData.columns);

    // Replace the ID string with an image
    this.settingsLocalFilters.columns.picture.valuePrepareFunction = this.prepareProfilePicCell;
    this.settingsLocalFilters.columns.picture.type = 'html';
    this.settingsLocalFilters.columns.picture.filter = false;

    // Add classes for coloring the status cells
    this.settingsLocalFilters.columns.status.valuePrepareFunction = this.prepareStatusCell;
    this.settingsLocalFilters.columns.status.type = 'html';

    // Set the filter for status as a dropdown
    this.settingsLocalFilters.columns.status.filter = {
      type: 'list',
      config: {
        selectText: 'Select...',
        list: [
          { value: 'In Progress', title: 'In Progress' },
          { value: 'Cancelled', title: 'Cancelled' },
          { value: 'Completed', title: 'Completed' }
        ]
      }
    };
  }

  // Only solution I could find to show the datepicker empty on page load
  ngAfterViewChecked(): void {
    if (!this.dateInit) {
      const dateInput = this.dpicker.elementRef.nativeElement.firstElementChild.firstElementChild;
      if (dateInput.value !== '') {
        dateInput.value = '';
        this.dateInit = true;
      }
    }
  }

  // Set the number of results per page for the smart table
  setResultsPerPage(pagination): void {
    this.perPage = Number(pagination);
    const page = this.dataSourceManualFilters.pagingConf.page;
    this.dataSourceManualFilters.setPaging(page, this.perPage, true);
  }

  // Show or hide the available filters
  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
    this.toggleFiltersLabel = this.filtersVisible ? 'Hide filters' : 'Show filters';
  }

  // Reset all the filters values
  clearFilters(): void {
    this.filtersForm.reset({
      search : '',
      ageRange: [0, 100],
      interests: [],
      bday: ''
    });
    this.dpicker.elementRef.nativeElement.firstElementChild.firstElementChild.value = '';
  }

  resetDatePicker(): void {
    this.filtersForm.controls.bday.reset('');
    this.dpicker.elementRef.nativeElement.firstElementChild.firstElementChild.value = '';
  }

  // Check if a string contains another
  stringContains(haystack, needle): boolean {
    return (haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1);
  }

  // Check if a row contains a string in any of its cells
  rowContains(row, needle): boolean {
    return (
      (this.stringContains(row.name, needle)) ||
      (this.stringContains(row.interests, needle)) ||
      (this.stringContains(row.country, needle)) ||
      (this.stringContains(row.status, needle))
    );
  }

  // Check if a interest contains a string
  interestsContain(rowInterest, interests): boolean {
    for (const interest of interests) {
      if (this.stringContains(rowInterest, interest)) {
        return true;
      }
    }

    return (interests.length === 0);
  }

  // Run the filters for the smart table
  formFilter(form): void {
    const search = form.search;
    const ageRange = form.ageRange;
    const interests = this.interests;

    // This is needed to allow for an empty date
    const bdayDirty = this.filtersForm.controls.bday.dirty;
    const bday = bdayDirty ? form.bday : '';

    const results = [];
    this.data.forEach(row => {
      if (
        (this.rowContains(row, search)) &&
        (ageRange[0] <= row.age) && (ageRange[1] >= row.age) &&
        (this.interestsContain(row.interests, interests)) &&
        (
          (bday === '') ||
          ((`${(bday.getMonth() + 1)}/${bday.getDate()}`) === row.birthday)
        )
      )
        results.push(row);
    });
    this.dataSourceManualFilters.load(results);
  }

  // Generate images for the profile pic cells
  prepareProfilePicCell(cell, row): string {
    return (`<img class="profile-pic" alt="ID" src="${cell}" />`);
  }

  // Generate the status cells with classes for coloring
  prepareStatusCell(cell, row): string {
    if (cell === 'In Progress') {
      return ('<div class="smart-table-inprogress">' + cell + '</div>');
    } else if (cell === 'Cancelled') {
      return ('<div class="smart-table-cancelled">' + cell + '</div>');
    } else if (cell === 'Completed') {
      return ('<div class="smart-table-completed">' + cell + '</div>');
    } else {
      return (cell);
    }
  }

  // Interest tags

  addInterest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.interests.push(value.trim());
      this.formFilter(this.filtersForm.value);
    }

    if (input) {
      input.value = '';
    }
  }

  removeInterest(interest: any): void {
    const index = this.interests.indexOf(interest);
    if (index >= 0) {
      this.interests.splice(index, 1);
      this.formFilter(this.filtersForm.value);
    }
  }

  // Confirmations for the smart table's actions

  onDeleteConfirm(event): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        icon: 'exclamation-circle',
        iconColor: 'failure',
        title: 'Do you want to delete this row?',
        options: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    });
  }

  onSaveConfirm(event): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        icon: 'check-circle',
        iconColor: 'success',
        title: 'Do you want to edit this row?',
        options: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    });
  }

  onCreateConfirm(event): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        icon: 'check-circle',
        iconColor: 'success',
        title: 'Do you want to add this row?',
        options: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    });
  }

  // For making copies of objects
  copyObject(obj): object {
    return JSON.parse(JSON.stringify(obj));
  }
}

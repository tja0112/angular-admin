import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'search-bar',
  styleUrls: ['./styles/search-bar.scss'],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnInit {

  searchBar = new FormControl();

  options = [
    'Charts',
    'Dashboard',
    'Forms',
    'Layouts',
    'Tables',
    'Utils'
  ];

  filteredOptions: Observable<Array<string>>;

  ngOnInit(): void {
    this.filteredOptions = this.searchBar.valueChanges.startWith(undefined)
      .map(val => val ? this.filter(val) : this.options.slice());
  }

  filter(val: string): Array<string> {
    return this.options.filter(option => new RegExp(`^${val}`, 'gi').test(option));
  }
}

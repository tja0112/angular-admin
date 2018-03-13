import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'regular-tables-page',
  templateUrl: './regular-tables.component.html',
  styleUrls: [ './styles/_regular-tables.scss' ]
})
export class RegularTablesPageComponent {
  columns = undefined;
  data = undefined;

  columns_list = [];
  data_list = [];

  constructor(private route: ActivatedRoute) {
    var tableData = route.snapshot.data["tableData"];
    this.columns = tableData.columns;
    this.data = tableData.data;

    this.columns_list = this.iterateObject(this.columns);
    this.data_list = this.data.map(x => this.iterateObject(x));
  };

  iterateObject(o) {
    var array = [];
    for (var key in o) {
      if (o.hasOwnProperty(key)) {
        array.push(o[key]);
      }
    }
    return array;
  }
}

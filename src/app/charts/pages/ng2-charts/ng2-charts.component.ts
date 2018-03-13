import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ng2-charts-page',
  templateUrl: './ng2-charts.component.html',
  styleUrls: ['./styles/ng2-charts.scss']
})
export class Ng2ChartsPageComponent {
  data: any = {};

  // Library refernces
  // https://github.com/valor-software/ng2-charts
  // https://valor-software.com/ng2-charts/
  // http://www.chartjs.org/docs/latest/

  constructor(route: ActivatedRoute, sanitizer: DomSanitizer) {
    this.data = route.snapshot.data['data'];
  }

  // events
  chartClicked(e: any): void {
    // console.log(e);
  }

  chartHovered(e: any): void {
    // console.log(e);
  }
}

import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ng2-nvd3-page',
  templateUrl: './ng2-nvd3.component.html',
  styleUrls: [
    './styles/nv.d3.css',
    './styles/nvd3.scss'
  ],
  encapsulation: ViewEncapsulation.None
})

export class Ng2Nvd3PageComponent {
  data = undefined;
  options = undefined;

  // Library refernces
  // https://github.com/krispo/ng2-nvd3
  // http://krispo.github.io/ng2-nvd3/
  // http://nvd3-community.github.io/nvd3/examples/documentation.html <- NVD3 docs

  constructor(private route: ActivatedRoute) {
    this.data = route.snapshot.data['data'].data;
    this.options = route.snapshot.data['data'].options;
  }

  toggleDonutChart(donut): void {
    const options = donut.options;
    options.chart.donut = !options.chart.donut;
    donut.updateWithOptions(options);
  }
}

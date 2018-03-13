import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './styles/dashboard.scss',
    '../layouts/pages/lists/styles/lists.scss',
    '../layouts/pages/tabs/styles/tabs.scss',
    '../charts/pages/ng2-charts/styles/ng2-charts.scss',
    '../tables/pages/extended/styles/_extended-tables.scss'
  ],
  encapsulation: ViewEncapsulation.None
})

export class DashboardPageComponent {
  charts: any = {};
  orders = [
    ['Completed Orders', 194],
    ['Completed Orders (Licenced)', 156],
    ['Completed Orders (Unlicenced)', 38],
    ['Abandoned Carts', 27],
    ['% of NLA that made purchase', '11%'],
    ['New Licenced Accounts', 12]
  ];
  table = {
    columns: [],
    data: []
  };
  baseUrl = "";

  constructor(route: ActivatedRoute, @Inject(APP_BASE_HREF) private baseHref:string) {
    this.charts = route.snapshot.data['chart'];
    this.table.columns = this.iterateObject(route.snapshot.data['table'].columns);
    this.table.data = route.snapshot.data['table'].data.map(x => this.iterateObject(x));
    this.charts.lineChart.options.maintainAspectRatio = false;
    this.charts.doughnutChart.options.maintainAspectRatio = false;
    this.baseUrl = baseHref;
  }

  iterateObject(o): Array<any> {
    const array = [];
    for (const key in o) {
      if (o.hasOwnProperty(key)) {
        array.push({name: key, value: o[key]});
      }
    }

    return array;
  }
}

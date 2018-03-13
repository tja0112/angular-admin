import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tabs-page',
  templateUrl: './tabs.component.html',
  styleUrls: ['./styles/tabs.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabsPageComponent {
  data: any = {};

  constructor(route: ActivatedRoute) {
    this.data = route.snapshot.data['data'];
  }
}

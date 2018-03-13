import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DashboardResolver implements Resolve<any> {

  constructor(

  ) { }

  resolve(route: ActivatedRouteSnapshot){
    return new Promise((resolve, reject) => {
      let breadcrumbs = [
        { url: '/', label: 'Home' }
      ];

      return resolve({
        // breadcrumbs: breadcrumbs
      });
    });
  }
}

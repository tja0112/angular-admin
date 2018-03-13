import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FormsValidationsResolver implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      const breadcrumbs = [
        { url: '/forms/controls-and-validations', label: 'Form Controls & Validations' }
      ];

      return resolve({
        // breadcrumbs: breadcrumbs
      });
    });
  }
}

@Injectable()
export class FormsExtendedControlsResolver implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      const breadcrumbs = [
        { url: '/forms/extended-controls', label: 'Form Extended Controls' }
      ];

      return resolve({
        // breadcrumbs: breadcrumbs
      });
    });
  }
}

@Injectable()
export class FormsLayoutsResolver implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      const breadcrumbs = [
        { url: '/forms/sample-layouts', label: 'Form Sample Layouts' }
      ];

      return resolve({
        // breadcrumbs: breadcrumbs
      });
    });
  }
}

@Injectable()
export class FormsWizardResolver implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      const breadcrumbs = [
        { url: '/forms/wizard', label: 'Form Wizard' }
      ];

      return resolve({
        // breadcrumbs: breadcrumbs
      });
    });
  }
}

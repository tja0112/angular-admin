import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class LayoutsService {

  baseUrl = "";

  constructor(
    private http: Http,
    @Inject(APP_BASE_HREF) private baseHref:string
  ) {
    this.baseUrl = baseHref;
  }

  getListsData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/assets/data/lists.json')
      .subscribe(
        data => resolve (data.json()),
        err => reject()
      );
    });
  }

  getCardsData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/assets/data/cards.json')
      .subscribe(
        data => resolve (data.json()),
        err => reject()
      );
    });
  }

}

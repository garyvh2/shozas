import { DetailStore } from './detail.store';

import { HttpClient } from '@angular/common/http';
import sample from 'src/main/webapp/app/akita/detail/sample-data';
import { Injectable } from '@angular/core';

@Injectable()
export class DetailService {
    constructor(private detailStore: DetailStore, private http: HttpClient) {}
    get(id: number) {
        //here should be the http request and sent it to the store
        //   const request = this.http.get(url).pipe(
        //       tap(response => this.productsStore.set(response)
        //       ));
        //
        //   return this.productsQuery.isPristine ? request : noop();
        this.detailStore.add(sample);
        console.log(this.detailStore._value(), 'fasdfsdfaf');
        return '';
    }
}

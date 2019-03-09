import { Component, OnInit } from '@angular/core';
import { Detail, DetailQuery, DetailService } from 'app/@akita/detail';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'jhi-state-detail',
    templateUrl: './state-detail.html',
    styles: []
})
export class StateDetail implements OnInit {
    id: number;
    detail$: Observable<Detail>;

    constructor(private detailService: DetailService, private detailQuery: DetailQuery, private route: ActivatedRoute) {}
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.detailService.get(this.id);
        this.detail$ = this.detailQuery.getDetail(this.id);
        this.detail$.subscribe(data => console.log(data, 'fasdf'));
    }
}

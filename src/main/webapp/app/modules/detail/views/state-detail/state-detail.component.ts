import { Component, OnInit } from '@angular/core';
import { Detail, RealStateQuery, RealStateService } from 'app/@akita/real-state';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'jhi-state-detail',
    templateUrl: './state-detail.component.html',
    styles: []
})
export class StateDetailComponent implements OnInit {
    id: number;
    detail$: Observable<Detail>;

    constructor(private detailService: RealStateService, private detailQuery: RealStateQuery, private route: ActivatedRoute) {}
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.detailService.get(this.id);
        this.detail$ = this.detailQuery.getDetail(this.id);
        this.detail$.subscribe(data => console.log(data, 'fasdf'));
    }
}

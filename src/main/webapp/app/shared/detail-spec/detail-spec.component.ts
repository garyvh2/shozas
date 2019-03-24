import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-detail-spec',
    templateUrl: './detail-spec.component.html',
    styleUrls: ['./detail-spec.component.scss']
})
export class DetailSpecComponent implements OnInit {
    @Input()
    src: string;
    @Input()
    label: string;

    constructor() {}

    ngOnInit() {}
}

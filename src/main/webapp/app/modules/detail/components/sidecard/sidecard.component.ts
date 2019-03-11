import { Detail } from './../../../../@akita/real-state/real-state.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-sidecard',
    templateUrl: './sidecard.component.html',
    styleUrls: ['sidecard.component.scss']
})
export class SidecardComponent implements OnInit {
    @Input()
    detail: Detail;
    constructor() {}

    ngOnInit() {}
}

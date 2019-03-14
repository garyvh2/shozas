import { Component, OnInit, Input } from '@angular/core';
import { RealState } from '../../../../@akita/real-state';

@Component({
    selector: 'jhi-sidecard',
    templateUrl: './sidecard.component.html',
    styleUrls: ['sidecard.component.scss']
})
export class SidecardComponent implements OnInit {
    @Input()
    detail: RealState;
    constructor() {}

    ngOnInit() {}
}

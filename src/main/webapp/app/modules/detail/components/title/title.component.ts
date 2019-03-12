import { RealState } from './../../../../@akita/real-state/real-state.model';

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-title',
    templateUrl: './title.component.html',
    styleUrls: ['title.component.scss']
})
export class TitleComponent implements OnInit {
    @Input()
    detail: RealState;

    constructor() {}

    ngOnInit() {}
}

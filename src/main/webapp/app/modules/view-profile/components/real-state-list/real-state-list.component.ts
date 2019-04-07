import { Component, OnInit, Input } from '@angular/core';
import { RealState } from './../../../../@akita/real-state/real-state.model';

@Component({
    selector: 'jhi-real-state-list',
    templateUrl: './real-state-list.component.html',
    styleUrls: ['real-state-list.component.scss']
})
export class RealStateListComponent implements OnInit {
    @Input()
    title: string;
    @Input()
    stateList: RealState[];

    constructor() {}

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import RealStateType from 'app/@akita/external-models/real-state-type';

@Component({
    selector: 'jhi-real-state-form',
    templateUrl: './real-state-form.component.html',
    styleUrls: ['real-state-form.component.scss']
})
export class RealStateFormComponent implements OnInit {
    realStateType = RealStateType;

    constructor() {}

    ngOnInit() {}
}

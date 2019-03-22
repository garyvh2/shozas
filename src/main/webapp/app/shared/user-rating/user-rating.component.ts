import { Component, OnInit, Input } from '@angular/core';
import { TempUser } from 'app/@akita/external-models/tempUser';
import { isEmpty } from '../util/gitgud-lodash/isEmpty';
@Component({
    selector: 'jhi-user-rating',
    templateUrl: './user-rating.component.html',
    styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
    @Input()
    user: TempUser;
    isEmpty: Function = isEmpty;

    constructor() {}

    ngOnInit() {}
}

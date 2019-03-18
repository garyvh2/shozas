import { Component, OnInit, Input } from '@angular/core';
import { TempUser } from 'app/@akita/external-models/tempUser';

@Component({
    selector: 'jhi-user-rating',
    templateUrl: './user-rating.component.html',
    styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
    @Input()
    user: TempUser;

    constructor() {}

    ngOnInit() {}
}

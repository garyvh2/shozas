import { User } from './../../modules/landing/views/search-results/search-results.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-user-rating',
    templateUrl: './user-rating.component.html',
    styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
    @Input()
    user: User;

    constructor() {}

    ngOnInit() {}
}

import { Detail } from 'app/@akita/real-state';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-title',
    templateUrl: './title.component.html',
    styleUrls: ['title.component.scss']
})
export class TitleComponent implements OnInit {
    @Input()
    detail: Detail;

    constructor() {}

    ngOnInit() {}
}

import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-ready-component',
    templateUrl: './ready-component.component.html',
    styleUrls: ['ready-component.component.scss']
})
export class ReadyComponentComponent implements OnInit {
    @Input()
    IsLoading: Observable<boolean>;
    @Input()
    IsError: Observable<boolean>;
    @Input()
    isEditable: boolean;

    constructor() {}

    ngOnInit() {}
}

import { RealState } from './../../../../@akita/real-state/real-state.model';

import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'jhi-title',
    templateUrl: './title.component.html',
    styleUrls: ['title.component.scss']
})
export class TitleComponent implements OnInit {
    @Input()
    detail: RealState;

    formattedDate: string;

    constructor() {}

    ngOnInit() {
        if (this.detail.dateCreated) {
            this.formattedDate = this.getFormattedDate(this.detail.dateCreated);
        } else {
            const dateTemp = new Date(
                moment()
                    .utcOffset('-0600')
                    .locale('en')
                    .add(1, 'd')
                    .format('MMM DD, YYYY HH:MM')
            );
            this.formattedDate = this.getFormattedDate(dateTemp);
        }
    }

    getFormattedDate(date: Date) {
        return moment(date)
            .locale('es')
            .format('LL');
    }
}

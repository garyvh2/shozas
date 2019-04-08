import { Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RealState } from './../../../../@akita/real-state/real-state.model';

@Component({
    selector: 'jhi-real-state-list',
    templateUrl: './real-state-list.component.html',
    styleUrls: ['real-state-list.component.scss']
})
export class RealStateListComponent implements OnChanges {
    @Input()
    title: string;
    @Input()
    stateList: RealState[];
    @Input()
    loading: boolean;
    @Input()
    editable: boolean;

    currentIndex = 0;

    constructor(private router: Router) {}

    ngOnChanges() {}
    onEdit(id: string) {
        this.router.navigate([`real-state/edit/${id}`]);
    }

    getIndex(index: number) {
        return (this.currentIndex + index) % this.stateList.length;
    }

    next() {
        this.currentIndex += 1;
    }
    prev() {
        if (this.currentIndex === 0) {
            this.currentIndex = this.stateList.length - 1;
        } else {
            this.currentIndex -= 1;
        }
    }
}

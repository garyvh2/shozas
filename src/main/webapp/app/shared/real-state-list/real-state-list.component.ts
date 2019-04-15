import { ID } from '@datorama/akita';
import { Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RealState } from './../../@akita/real-state/real-state.model';

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
    @Input()
    linkable: boolean;

    currentIndex = 0;

    get currentElements() {
        return [0, 1, 2].map(index => this.stateList[this.getIndex(index)]);
    }

    constructor(private router: Router) {}

    ngOnChanges() {}
    onEdit(id: ID) {
        this.router.navigate([`real-state/edit/${id}`]);
    }

    getIndex(index: number) {
        return (this.currentIndex + index) % this.stateList.length;
    }

    getId(index: number) {
        const realState = this.stateList[this.getIndex(index)];
        return realState && realState.id;
    }

    navigate(id: number) {
        if (this.linkable) {
            this.router.navigate(['/detail/', id]);
        }
    }

    trackByFn(index: number, item: RealState) {
        return item.id;
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

import { MatDialog } from '@angular/material';
import { ID } from '@datorama/akita';
import { Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RealState } from './../../@akita/real-state/real-state.model';
import { BoughtModalComponent } from '../bought-modal/bought-modal.component';
import { RemoveModalComponent } from '../remove-modal/remove-modal.component';
import { RemoveType } from '../util/remove-type';
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
        if (this.stateList.length < 3) {
            return this.stateList;
        }
        return [0, 1, 2].map(index => this.stateList[this.getIndex(index)]);
    }

    constructor(private router: Router, public dialog: MatDialog) {}

    ngOnChanges() {}
    onEdit(id: ID) {
        this.router.navigate([`real-state/edit/${id}`]);
    }

    getIndex(index: number) {
        return (this.currentIndex + index) % this.stateList.length;
    }

    openBoughtModal(realState: RealState) {
        this.dialog.open(BoughtModalComponent, { data: realState, autoFocus: false });
    }

    openRemoveModal(id: ID) {
        const message = ' este inmueble';
        this.dialog.open(RemoveModalComponent, {
            data: { id, serviceType: RemoveType.RealState, actionMessage: message },
            autoFocus: false
        });
    }
    getId(index: number) {
        const realState = this.stateList[this.getIndex(index)];
        return realState && realState.id;
    }

    navigate(id: number) {
        if (this.linkable) {
            document.querySelector('jhi-main').scroll(0, 0);
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

import { FinanceData } from './../../../../@akita/external-models/finance-data';
import { FinanceDataService } from './../../services/finance-data.service';
import { FinanceModalComponent } from './../finance-modal/finance-modal.component';
import { Component, OnInit, Input } from '@angular/core';
import { RealState } from '../../../../@akita/real-state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'jhi-sidecard',
    templateUrl: './sidecard.component.html',
    styleUrls: ['sidecard.component.scss']
})
export class SidecardComponent implements OnInit {
    @Input()
    detail: RealState;

    financeData: FinanceData[];

    constructor(private financeService: FinanceDataService, public dialog: MatDialog) {}

    ngOnInit() {
        this.loadFinanceData();
    }

    loadFinanceData() {
        this.financeService.getFinanceData().subscribe(data => {
            console.log('FinanceData:', data);
            this.financeData = data;
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(FinanceModalComponent, {
            width: '80vw',
            height: 'auto',
            data: {
                financeData: this.financeData,
                rsData: this.detail
            }
        });
    }
}

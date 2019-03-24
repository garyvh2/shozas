import { LoginModalService } from './../../../../core/login/login-modal.service';

import { FinanceData } from './../../../../@akita/external-models/finance-data';
import { FinanceDataService } from './../../services/finance-data.service';
import { FinanceModalComponent } from './../finance-modal/finance-modal.component';
import { Component, OnInit, Input } from '@angular/core';
import { RealState } from '../../../../@akita/real-state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RealstateDetailService } from '../../services/realstate-detail.service';

@Component({
    selector: 'jhi-sidecard',
    templateUrl: './sidecard.component.html',
    styleUrls: ['sidecard.component.scss']
})
export class SidecardComponent implements OnInit {
    @Input()
    detail: RealState;

    financeData: FinanceData[];

    constructor(
        private financeService: FinanceDataService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private rsdService: RealstateDetailService,
        private loginModalService: LoginModalService
    ) {}

    ngOnInit() {
        this.loadFinanceData();
    }

    loadFinanceData() {
        this.financeService.getFinanceData().subscribe(data => {
            this.financeData = data;
        });
    }

    openDialog(): void {
        if (this.financeData !== null) {
            const dialogRef = this.dialog.open(FinanceModalComponent, {
                width: '80vw',
                height: 'auto',
                data: {
                    financeData: this.financeData,
                    rsData: this.detail
                }
            });
        } else {
            this.openSnackBar('Estimacion de financiamiento no disponible');
        }
    }

    contactOwner() {
        let message = 'Se ha informado al vendedor de su interes en esta propiedad';

        try {
            this.rsdService.contactOwner(this.detail).subscribe(data => {
                if (data.id === this.detail.owner.id) {
                    message = 'Usted es el vendedor.';
                }

                this.openSnackBar(message);
            });
        } catch (error) {
            this.loginModalService.open();
        }
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'Cerrar', {
            duration: 2000
        });
    }
}

import { DataCRP } from './../../../../@akita/external-models/data-crp';
import { IpsDataService } from './../../services/ips-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { RealState } from '../../../../@akita/real-state';

@Component({
    selector: 'jhi-ips-data',
    templateUrl: './ips-data.component.html',
    styleUrls: ['./ips-data.component.scss']
})
export class IpsDataComponent implements OnInit {
    @Input()
    rs: RealState;

    dataCRP: Promise<DataCRP>;

    constructor(private ipsService: IpsDataService) {}

    ngOnInit() {
        this.loadCRPData();
    }

    loadCRPData() {
        this.dataCRP = this.ipsService.getCRPDataCanton(this.rs).toPromise();
    }
}

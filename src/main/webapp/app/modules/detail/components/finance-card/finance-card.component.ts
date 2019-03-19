import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-finance-card',
    templateUrl: './finance-card.component.html',
    styleUrls: ['./finance-card.component.scss']
})
export class FinanceCardComponent implements OnInit {
    @Input()
    bank: any;
    @Input()
    rs: any;

    premium: number;
    monthlyFee: number;
    imgSource: string;

    constructor() {}

    ngOnInit() {
        this.premium = (this.bank.prima / 100) * this.rs.price || 0;
        this.calculateMonthlyFee();
        this.imgSource = './../../../../../assets/images/' + this.bank.name + '.png';
    }

    calculateMonthlyFee() {
        this.validatePremium();

        const rate = this.bank.rate / 100 / 12;
        const price = this.rs.price - this.premium;
        const months = 84;
        const middleValue = Math.pow(1 + rate, months);

        this.monthlyFee = Math.ceil((price * (rate * middleValue)) / (middleValue - 1));
    }

    validatePremium() {
        const minPremium = (this.bank.prima / 100) * this.rs.price;

        if (this.premium > this.rs.price) {
            this.premium = this.rs.price;
        }
        if (this.premium < minPremium) {
            this.premium = minPremium;
        }
    }
}

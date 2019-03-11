import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAmountComponent } from './filter-amount.component';

describe('FilterAmountComponent', () => {
    let component: FilterAmountComponent;
    let fixture: ComponentFixture<FilterAmountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FilterAmountComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterAmountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

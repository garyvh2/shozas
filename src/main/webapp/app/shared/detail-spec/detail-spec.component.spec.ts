import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSpecComponent } from './detail-spec.component';

describe('DetailSpecComponent', () => {
    let component: DetailSpecComponent;
    let fixture: ComponentFixture<DetailSpecComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailSpecComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailSpecComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
